const express = require('express');
const { query } = require('../config/database');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get analytics overview for a form
router.get('/form/:formId/overview', auth, async (req, res) => {
  try {
    const { formId } = req.params;

    // Check if form belongs to user
    const formCheck = await query(
      'SELECT id, title, created_at FROM forms WHERE id = $1 AND user_id = $2',
      [formId, req.user.id]
    );

    if (formCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Get basic stats
    const [viewsResult, submissionsResult, completionResult, deviceResult] = await Promise.all([
      query('SELECT COUNT(*) as total_views FROM form_analytics WHERE form_id = $1 AND event_type = \'view\'', [formId]),
      query('SELECT COUNT(*) as total_submissions FROM form_submissions WHERE form_id = $1', [formId]),
      query(`
        SELECT 
          COUNT(*) as total_submissions,
          COUNT(CASE WHEN is_completed = TRUE THEN 1 END) as completed_submissions,
          ROUND(AVG(completion_time_seconds)) as avg_completion_time
        FROM form_submissions 
        WHERE form_id = $1
      `, [formId]),
      query(`
        SELECT 
          CASE 
            WHEN user_agent ILIKE '%mobile%' THEN 'Mobile'
            WHEN user_agent ILIKE '%tablet%' THEN 'Tablet'
            ELSE 'Desktop'
          END as device_type,
          COUNT(*) as count
        FROM form_analytics 
        WHERE form_id = $1 AND event_type = 'view'
        GROUP BY device_type
      `, [formId])
    ]);

    const views = parseInt(viewsResult.rows[0].total_views);
    const submissions = parseInt(submissionsResult.rows[0].total_submissions);
    const completionData = completionResult.rows[0];
    const completedSubmissions = parseInt(completionData.completed_submissions);
    const avgCompletionTime = parseInt(completionData.avg_completion_time) || 0;

    // Calculate conversion rate
    const conversionRate = views > 0 ? ((submissions / views) * 100).toFixed(2) : 0;
    const completionRate = submissions > 0 ? ((completedSubmissions / submissions) * 100).toFixed(2) : 0;

    // Process device data
    const deviceStats = deviceResult.rows.reduce((acc, row) => {
      acc[row.device_type] = parseInt(row.count);
      return acc;
    }, {});

    res.json({
      overview: {
        totalViews: views,
        totalSubmissions: submissions,
        completedSubmissions,
        conversionRate: parseFloat(conversionRate),
        completionRate: parseFloat(completionRate),
        avgCompletionTime
      },
      deviceBreakdown: deviceStats
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get daily analytics for a form
router.get('/form/:formId/daily', auth, async (req, res) => {
  try {
    const { formId } = req.params;
    const { days = 30 } = req.query;

    // Check if form belongs to user
    const formCheck = await query(
      'SELECT id FROM forms WHERE id = $1 AND user_id = $2',
      [formId, req.user.id]
    );

    if (formCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const [viewsData, submissionsData] = await Promise.all([
      query(`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as views
        FROM form_analytics 
        WHERE form_id = $1 AND event_type = 'view' 
          AND created_at >= NOW() - INTERVAL '${days} days'
        GROUP BY DATE(created_at)
        ORDER BY date
      `, [formId]),
      query(`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as submissions,
          COUNT(CASE WHEN is_completed = TRUE THEN 1 END) as completed
        FROM form_submissions 
        WHERE form_id = $1 
          AND created_at >= NOW() - INTERVAL '${days} days'
        GROUP BY DATE(created_at)
        ORDER BY date
      `, [formId])
    ]);

    // Combine data
    const dailyData = {};
    const today = new Date();
    
    // Initialize all dates
    for (let i = 0; i < parseInt(days); i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyData[dateStr] = {
        date: dateStr,
        views: 0,
        submissions: 0,
        completed: 0
      };
    }

    // Add views data
    viewsData.rows.forEach(row => {
      const dateStr = row.date.toISOString().split('T')[0];
      if (dailyData[dateStr]) {
        dailyData[dateStr].views = parseInt(row.views);
      }
    });

    // Add submissions data
    submissionsData.rows.forEach(row => {
      const dateStr = row.date.toISOString().split('T')[0];
      if (dailyData[dateStr]) {
        dailyData[dateStr].submissions = parseInt(row.submissions);
        dailyData[dateStr].completed = parseInt(row.completed);
      }
    });

    res.json({
      dailyStats: Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date))
    });
  } catch (error) {
    console.error('Daily analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get field analytics for a form
router.get('/form/:formId/fields', auth, async (req, res) => {
  try {
    const { formId } = req.params;

    // Check if form belongs to user
    const formCheck = await query(
      'SELECT id FROM forms WHERE id = $1 AND user_id = $2',
      [formId, req.user.id]
    );

    if (formCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Get submissions with field data
    const submissionsResult = await query(
      'SELECT submission_data FROM form_submissions WHERE form_id = $1 AND is_completed = TRUE',
      [formId]
    );

    const submissions = submissionsResult.rows;
    const fieldStats = {};

    // Analyze each field across all submissions
    submissions.forEach(submission => {
      const data = submission.submission_data;
      
      Object.keys(data).forEach(fieldId => {
        if (!fieldStats[fieldId]) {
          fieldStats[fieldId] = {
            totalResponses: 0,
            emptyResponses: 0,
            uniqueValues: new Set(),
            valueDistribution: {}
          };
        }

        const value = data[fieldId];
        fieldStats[fieldId].totalResponses++;
        
        if (!value || value === '') {
          fieldStats[fieldId].emptyResponses++;
        } else {
          fieldStats[fieldId].uniqueValues.add(String(value));
          
          // Count value distribution
          const valueStr = String(value);
          fieldStats[fieldId].valueDistribution[valueStr] = 
            (fieldStats[fieldId].valueDistribution[valueStr] || 0) + 1;
        }
      });
    });

    // Convert Sets to counts and prepare final data
    const finalFieldStats = {};
    Object.keys(fieldStats).forEach(fieldId => {
      const stats = fieldStats[fieldId];
      finalFieldStats[fieldId] = {
        totalResponses: stats.totalResponses,
        emptyResponses: stats.emptyResponses,
        completionRate: stats.totalResponses > 0 ? 
          ((stats.totalResponses - stats.emptyResponses) / stats.totalResponses * 100).toFixed(2) : 0,
        uniqueValues: stats.uniqueValues.size,
        topValues: Object.entries(stats.valueDistribution)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([value, count]) => ({ value, count }))
      };
    });

    res.json({
      fieldStats: finalFieldStats
    });
  } catch (error) {
    console.error('Field analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's overall analytics
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [formsResult, totalViewsResult, totalSubmissionsResult] = await Promise.all([
      query('SELECT COUNT(*) as total_forms FROM forms WHERE user_id = $1', [userId]),
      query(`
        SELECT COUNT(*) as total_views
        FROM form_analytics fa
        JOIN forms f ON fa.form_id = f.id
        WHERE f.user_id = $1 AND fa.event_type = 'view'
      `, [userId]),
      query(`
        SELECT COUNT(*) as total_submissions
        FROM form_submissions fs
        JOIN forms f ON fs.form_id = f.id
        WHERE f.user_id = $1
      `, [userId])
    ]);

    const totalForms = parseInt(formsResult.rows[0].total_forms);
    const totalViews = parseInt(totalViewsResult.rows[0].total_views);
    const totalSubmissions = parseInt(totalSubmissionsResult.rows[0].total_submissions);

    // Get recent activity
    const recentActivity = await query(`
      SELECT 
        fa.event_type,
        fa.form_id,
        f.title as form_title,
        fa.created_at
      FROM form_analytics fa
      JOIN forms f ON fa.form_id = f.id
      WHERE f.user_id = $1
      ORDER BY fa.created_at DESC
      LIMIT 10
    `, [userId]);

    // Get top performing forms
    const topForms = await query(`
      SELECT 
        f.id,
        f.title,
        f.view_count,
        f.submission_count,
        CASE 
          WHEN f.view_count > 0 THEN ROUND((f.submission_count::float / f.view_count::float) * 100, 2)
          ELSE 0
        END as conversion_rate
      FROM forms f
      WHERE f.user_id = $1
      ORDER BY f.submission_count DESC
      LIMIT 5
    `, [userId]);

    res.json({
      overview: {
        totalForms,
        totalViews,
        totalSubmissions,
        avgConversionRate: totalViews > 0 ? 
          ((totalSubmissions / totalViews) * 100).toFixed(2) : 0
      },
      recentActivity: recentActivity.rows,
      topForms: topForms.rows
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
