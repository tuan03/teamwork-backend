const express = require('express');
const router = express.Router();
const notificationController = require('./notificationController');
const { createNotificationValidation, markAsReadValidation, deleteNotificationValidation } = require('./notificationValidations');
const authenticateUser = require('../../middlewares/authen');

// Middleware for user authentication
router.use(authenticateUser);

// Create a new notification
router.post('/', createNotificationValidation, notificationController.createNotification);

// Get notifications for a user
router.get('/:userId', notificationController.getNotifications);

// Mark a notification as read
router.put('/:id/mark-as-read', markAsReadValidation, notificationController.markAsRead);

// Delete a notification
router.delete('/:id', deleteNotificationValidation, notificationController.deleteNotification);

module.exports = router;
