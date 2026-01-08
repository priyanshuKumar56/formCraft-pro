const express = require('express');
const { query } = require('../config/database');
const { auth, optionalAuth } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Get all forms for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE user_id = $1';
    const queryParams = [req.user.id];
    
    if (status) {
      whereClause += ` AND status = $${queryParams.length + 1}`;
      queryParams.push(status);
    }
    
    if (search) {
      whereClause += ` AND (title ILIKE $${queryParams.length + 1} OR description ILIKE $${queryParams.length + 1})`;
      queryParams.push(`%${search}%`);
    }

    const formsQuery = `
      SELECT id, title, description, status, public, slug, view_count, submission_count, created_at, updated_at
      FROM forms 
      ${whereClause}
      ORDER BY updated_at DESC 
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;
    queryParams.push(limit, offset);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM forms 
      ${whereClause}
    `;

    const [formsResult, countResult] = await Promise.all([
      query(formsQuery, queryParams),
      query(countQuery, queryParams.slice(0, -2))
    ]);

    res.json({
      forms: formsResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        totalPages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get forms error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get form by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'SELECT * FROM forms WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new form
router.post('/', auth, validateRequest(schemas.createForm), async (req, res) => {
  try {
    const { title, description, formData, settings, status, public: isPublic } = req.body;
    
    // Generate unique slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 50);
    const slugCheck = await query('SELECT id FROM forms WHERE slug = $1', [slug]);
    
    if (slugCheck.rows.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const result = await query(
      `INSERT INTO forms (user_id, title, description, form_data, settings, status, public, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [req.user.id, title, description, formData, settings, status, isPublic, slug]
    );

    res.status(201).json({
      message: 'Form created successfully',
      form: result.rows[0]
    });
  } catch (error) {
    console.error('Create form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update form
router.put('/:id', auth, validateRequest(schemas.updateForm), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Check if form exists and belongs to user
    const existingForm = await query(
      'SELECT id FROM forms WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existingForm.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    let paramIndex = 1;

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        updateFields.push(`${key} = $${paramIndex}`);
        updateValues.push(updates[key]);
        paramIndex++;
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    updateValues.push(id, req.user.id);

    const updateQuery = `
      UPDATE forms 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
      RETURNING *
    `;

    const result = await query(updateQuery, updateValues);

    res.json({
      message: 'Form updated successfully',
      form: result.rows[0]
    });
  } catch (error) {
    console.error('Update form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete form
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM forms WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Delete form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get public form by slug (for form submission)
router.get('/public/:slug', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await query(
      `SELECT id, title, description, form_data, settings, slug
       FROM forms 
       WHERE slug = $1 AND public = TRUE AND status = 'published'`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found or not public' });
    }

    // Increment view count
    await query(
      'UPDATE forms SET view_count = view_count + 1 WHERE id = $1',
      [result.rows[0].id]
    );

    // Track analytics
    await query(
      'INSERT INTO form_analytics (form_id, event_type, event_data, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [result.rows[0].id, 'view', {}, req.ip, req.get('User-Agent')]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get public form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Duplicate form
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get original form
    const originalForm = await query(
      'SELECT * FROM forms WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (originalForm.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const form = originalForm.rows[0];
    
    // Create duplicate
    const newTitle = `${form.title} (Copy)`;
    let slug = newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 50);
    
    const slugCheck = await query('SELECT id FROM forms WHERE slug = $1', [slug]);
    if (slugCheck.rows.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const result = await query(
      `INSERT INTO forms (user_id, title, description, form_data, settings, status, public, slug)
       VALUES ($1, $2, $3, $4, $5, 'draft', false, $6)
       RETURNING *`,
      [req.user.id, newTitle, form.description, form.form_data, form.settings, slug]
    );

    res.status(201).json({
      message: 'Form duplicated successfully',
      form: result.rows[0]
    });
  } catch (error) {
    console.error('Duplicate form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
