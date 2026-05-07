const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }
  next();
};


const validateLogin = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

const validateCreateLead = [
  body('lead_name').trim().notEmpty().withMessage('Lead name is required'),
  body('company_name').trim().notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('phone').isMobilePhone().withMessage('Phone must be valid'),
  body('deal_value').optional().isFloat({ min: 0 }).withMessage('Deal value must be a positive number'),
  handleValidationErrors
];

const validateUpdateLead = [
  body('status').optional().notEmpty().withMessage('Status is required'),
  body('deal_value').optional().isFloat({ min: 0 }).withMessage('Deal value must be a positive number'),
  handleValidationErrors
];


const validateCreateNote = [
  body('lead_id').isInt().withMessage('Lead ID is required'),
  body('content').trim().notEmpty().withMessage('Note content is required'),
  handleValidationErrors
];

module.exports = {
  validateLogin,
  validateCreateLead,
  validateUpdateLead,
  validateCreateNote
};
