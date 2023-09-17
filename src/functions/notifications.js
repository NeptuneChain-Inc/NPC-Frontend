

/**
 * Pushes a new notification to an array in local storage.
 * Each notification will have a type and a message.
 *
 * @param {string} type - The type of the notification (e.g., 'error', 'success')
 * @param {string} message - The message for the notification
 */
export const pushLocalNotification = (type, message) => {
    // Retrieve existing notifications from local storage
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
  
    // Create a new notification object
    const newNotification = {
      id: existingNotifications.length,  // Unique identifier for each notification
      type,
      message,
      time: Date.now()
    };
  
    // Add the new notification to the existing notifications
    const updatedNotifications = [...existingNotifications, newNotification];
  
    // Save the updated notifications back to local storage
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    return newNotification;
  };
  