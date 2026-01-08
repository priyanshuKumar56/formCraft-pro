const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if session exists and is valid
    const sessionResult = await query(
      'SELECT * FROM user_sessions WHERE token_hash = $1 AND user_id = $2 AND expires_at > NOW()',
      [require('crypto').createHash('sha256').update(token).digest('hex'), decoded.userId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // Get user details
    const userResult = await query(
      'SELECT id, email, first_name, last_name, role, subscription_plan FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'User not found.' });
    }

    req.user = userResult.rows[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    res.status(500).json({ error: 'Server error during authentication.' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const sessionResult = await query(
      'SELECT * FROM user_sessions WHERE token_hash = $1 AND user_id = $2 AND expires_at > NOW()',
      [require('crypto').createHash('sha256').update(token).digest('hex'), decoded.userId]
    );

    if (sessionResult.rows.length === 0) {
      req.user = null;
      return next();
    }

    const userResult = await query(
      'SELECT id, email, first_name, last_name, role, subscription_plan FROM users WHERE id = $1',
      [decoded.userId]
    );

    req.user = userResult.rows[0] || null;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = { auth, optionalAuth };
