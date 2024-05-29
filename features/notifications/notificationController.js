const Notification = require('../../models/notificationModel');
const Result = require('../../utils/result');
const { statusErrors } = require('../../utils/statusErrors');

// Create a new notification
async function createNotification(req, res, next) {
  try {
    const { ReceiverID, Content } = req.body;

    const newNotification = await Notification.create({
      ReceiverID,
      Content
    });

    res.status(201).json(Result.success(newNotification));
  } catch (error) {
    next(Result.error(statusErrors.INTERNAL_SERVER_ERROR, error.message));
  }
}

// Get notifications for a user
async function getNotifications(req, res, next) {
  try {
    const { userId } = req.params;

    const notifications = await Notification.findAll({ where: { ReceiverID: userId } });

    res.status(200).json(Result.success(notifications));
  } catch (error) {
    next(Result.error(statusErrors.INTERNAL_SERVER_ERROR, error.message));
  }
}

// Mark a notification as read
async function markAsRead(req, res, next) {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    }

    notification.IsRead = true;
    await notification.save();

    res.status(200).json(Result.success(notification));
  } catch (error) {
    next(Result.error(statusErrors.INTERNAL_SERVER_ERROR, error.message));
  }
}

// Delete a notification
async function deleteNotification(req, res, next) {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    }

    await notification.destroy();

    res.status(200).json(Result.success('Notification deleted successfully'));
  } catch (error) {
    next(Result.error(statusErrors.INTERNAL_SERVER_ERROR, error.message));
  }
}

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification
};
