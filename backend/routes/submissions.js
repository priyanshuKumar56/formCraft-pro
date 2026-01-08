const express = require('express');
const { query } = require('../config/database');
const { auth, optionalAuth } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Submit form (public endpoint)
router.post('/form/:formId', optionalAuth, validateRequest(schemas.submitForm), async (req, res) => {
  try {
    const { formId } = req.params;
    const { submissionData, isCompleted, completionTimeSeconds } = req.body;

    // Check if form exists and is public
    const formResult = await query(
      'SELECT id, title, user_id FROM forms WHERE id = $1 AND public = TRUE AND status = \'published\'',
      [formId]
    );

    if (formResult.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found or not accepting submissions' });
    }

    const form = formResult.rows[0];

    // Create submission
    const result = await query(
      `INSERT INTO form_submissions 
       (form_id, submission_data, ip_address, user_agent, referrer, completion_time_seconds, is_completed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [formId, submissionData, req.ip, req.get('User-Agent'), req.get('Referer'), completionTimeSeconds, isCompleted]
    );

    // Update form submission count
    await query(
      'UPDATE forms SET submission_count = submission_count + 1 WHERE id = $1',
      [formId]
    );

    // Track analytics
    await query(
      'INSERT INTO form_analytics (form_id, event_type, event_data, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [formId, 'submission', { submissionId: result.rows[0].id, isCompleted }, req.ip, req.get('User-Agent')]
    );

    res.status(201).json({
      message: 'Form submitted successfully',
      submissionId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Submit form error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all submissions for a form (form owner only)
router.get('/form/:formId', auth, async (req, res) => {
  try {
    const { formId } = req.params;
    const { page = 1, limit = 10, startDate, endDate, completed } = req.query;
    const offset = (page - 1) * limit;

    // Check if form belongs to user
    const formCheck = await query(
      'SELECT id FROM forms WHERE id = $1 AND user_id = $2',
      [formId, req.user.id]
    );

    if (formCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Build query with filters
    let whereClause = 'WHERE form_id = $1';
    const queryParams = [formId];
    let paramIndex = 2;

    if (startDate) {
      whereClause += ` AND created_at >= $${paramIndex}`;
      queryParams.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      whereClause += ` AND created_at <= $${paramIndex}`;
      queryParams.push(endDate);
      paramIndex++;
    }

    if (completed !== undefined) {
      whereClause += ` AND is_completed = $${paramIndex}`;
      queryParams.push(completed === 'true');
      paramIndex++;
    }

    const submissionsQuery = `
      SELECT id, submission_data, ip_address, user_agent, referrer, completion_time_seconds, is_completed, created_at
      FROM form_submissions 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    queryParams.push(limit, offset);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM form_submissions 
      ${whereClause}
    `;

    const [submissionsResult, countResult] = await Promise.all([
      query(submissionsQuery, queryParams),
      query(countQuery, queryParams.slice(0, -2))
    ]);

    res.json({
      submissions: submissionsResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        totalPages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single submission
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT fs.*, f.title as form_title, f.user_id as form_owner_id
       FROM form_submissions fs
       JOIN forms f ON fs.form_id = f.id
       WHERE fs.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    const submission = result.rows[0];

    // Check if user owns the form
    if (submission.form_owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete submission
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if submission exists and user owns the form
    const result = await query(
      `DELETE FROM form_submissions 
       WHERE id = $1 AND form_id IN (SELECT id FROM forms WHERE user_id = $2)
       RETURNING id`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found or access denied' });
    }

    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export submissions as CSV
router.get('/form/:formId/export', auth, async (req, res) => {
  try {
    const { formId } = req.params;
    const { format = 'csv' } = req.query;

    // Check if form belongs to user
    const formCheck = await query(
      'SELECT id, title FROM forms WHERE id = $1 AND user_id = $2',
      [formId, req.user.id]
    );

    if (formCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const form = formCheck.rows[0];

    // Get all submissions
    const submissionsResult = await query(
      'SELECT submission_data, created_at FROM form_submissions WHERE form_id = $1 AND is_completed = TRUE ORDER BY created_at',
      [formId]
    );

    if (format === 'csv') {
      // Convert to CSV
      const submissions = submissionsResult.rows;
      
      if (submissions.length === 0) {
        return res.status(200).send('No submissions found');
      }

      // Extract headers from first submission
      const headers = Object.keys(submissions[0].submission_data);
      
      // Build CSV
      let csv = headers.join(',') + '\n';
      
      submissions.forEach(submission => {
        const row = headers.map(header => {
          const value = submission.submission_data[header];
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        });
        csv += row.join(',') + '\n';
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${form.title}-submissions.csv"`);
      res.send(csv);
    } else {
      // Return JSON
      res.json({
        form: {
          id: formId,
          title: form.title
        },
        submissions: submissionsResult.rows
      });
    }
  } catch (error) {
    console.error('Export submissions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
