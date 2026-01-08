const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    next();
  };
};

const schemas = {
  // User validation schemas
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Form validation schemas
  createForm: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().max(1000).optional(),
    formData: Joi.object().required(),
    settings: Joi.object().optional(),
    status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
    public: Joi.boolean().default(false)
  }),

  updateForm: Joi.object({
    title: Joi.string().min(1).max(255).optional(),
    description: Joi.string().max(1000).optional(),
    formData: Joi.object().optional(),
    settings: Joi.object().optional(),
    status: Joi.string().valid('draft', 'published', 'archived').optional(),
    public: Joi.boolean().optional()
  }),

  // Form submission validation
  submitForm: Joi.object({
    submissionData: Joi.object().required(),
    isCompleted: Joi.boolean().default(true),
    completionTimeSeconds: Joi.number().integer().min(0).optional()
  }),

  // User profile update
  updateProfile: Joi.object({
    firstName: Joi.string().min(1).max(100).optional(),
    lastName: Joi.string().min(1).max(100).optional(),
    avatarUrl: Joi.string().uri().optional()
  }),

  // Password change
  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  })
};

module.exports = { validateRequest, schemas };
