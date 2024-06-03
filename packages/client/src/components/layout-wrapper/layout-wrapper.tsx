import { App, Layout } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

let message: MessageInstance;
let notification: NotificationInstance;

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  notification = staticFunction.notification;
  return <Layout>{children}</Layout>;
};

export { message, notification };
