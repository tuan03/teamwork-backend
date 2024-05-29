const Notification = require('../models/notificationModel');

async function addNotification(UserID, Content, io) {
  try {
    const newNotification = await Notification.create({
      ReceiverID: UserID,
      Content
    });

    // Emit event to the specific user
    io.to(`user_${UserID}`).emit('new_notification', newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

module.exports = {
  addNotification
};
