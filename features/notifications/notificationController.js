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

    res.status(201).json(Result.success(201,newNotification));
  } catch (error) {
    next(Result.error(statusErrors.INTERNAL_SERVER_ERROR, error.message));
  }
}

// Get notifications for a user
async function getNotifications(req, res, next) {
  try {
    const { userId } = req.params;

    const notifications = await Notification.findAll({ attributes: { exclude: ['IsRead'] }, where: { ReceiverID: userId } });
    await Notification.update({ IsRead: true }, { where: { ReceiverID: userId } });

    res.status(200).json(Result.success(200,notifications));
  } catch (error) {
    next(Result.error(statusErrors.INTERNAL_SERVER_ERROR, error.message));
  }
}




module.exports = {
  createNotification,
  getNotifications,
};
