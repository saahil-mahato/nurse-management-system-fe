import { NotificationPlacement } from 'antd/es/notification/interface';

import { NotificationType } from '../constants/Types';

/**
 * Function to open a notification.
 *
 * @param {any} api - the react hook api for ant design notification.
 * @param {NotificationType} type - the type of the notification.
 * @param {string} message - the message of the notification.
 * @param {string} description - the description of the notification.
 * @param {NotificationPlacement} placement - the placement of the notification.
 */
export const openNotification = (
  api: any,
  type: NotificationType,
  message: string,
  description: string,
  placement: NotificationPlacement,
) => {
  api[type]({ message, description, placement });
};

export default openNotification;
