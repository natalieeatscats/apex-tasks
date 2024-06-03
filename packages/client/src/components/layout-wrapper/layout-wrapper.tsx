import { App, Layout } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

let message: MessageInstance;
let notification: NotificationInstance;

type Props = {
  children: ReactNode;
};

export const LayoutWrapper = (props: Props) => {
  const { children } = props;
  const staticFunction = App.useApp();
  message = staticFunction.message;
  notification = staticFunction.notification;
  return <Layout>{children}</Layout>;
};

export { message, notification };
