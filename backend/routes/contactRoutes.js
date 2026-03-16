const express = require('express');
const { body } = require('express-validator');
const { contactLimiter } = require('../middleware/rateLimiter'); // <-- NEW: Import the limiter
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

const router = express.Router();

// Validation middleware for contact creation
const validateContact = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1 })
    .withMessage('First name must have at least 1 character'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1 })
    .withMessage('Last name must have at least 1 character'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 1 })
    .withMessage('Subject must have at least 1 character'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1 })
    .withMessage('Message must have at least 1 character')
];

// Public route
// FIX: Apply contactLimiter ONLY to the public POST route
router.post('/', contactLimiter, validateContact, createContact);

// Admin routes (These are now only protected by the less aggressive generalLimiter 
// applied in server.js, and the x-admin-secret-key middleware on the backend)
router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContactById);
router.patch('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;