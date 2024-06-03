import { errorCodes } from '../constants/error-codes.constants';
import { notification } from 'antd';

const defaultTitle = 'Unexpected Error occurred';
const defaultMessage = 'Try again later';

type TShowErrorParams = {
  status?: number;
  title?: string;
  message?: string | unknown;
};

function getMessage(
  codes: Record<number, string>,
  title?: string,
  status?: number
): string {
  if (!(status && codes[status])) return title ?? '';

  return `Error ${status} ${codes[status]}`;
}

export const showError = ({
  status,
  title = defaultTitle,
  message = defaultMessage
}: TShowErrorParams) => {
  const description = JSON.stringify(message);

  notification.error({
    message: getMessage(errorCodes, title, status),
    description,
    placement: 'bottomRight',
    duration: 10
  });
};
