import { TApiErrorResponse } from '../types/api-error.types.ts';

export function isApiErrorResponse(
  response: unknown
): response is TApiErrorResponse {
  return (
    typeof response === 'object' &&
    response != null &&
    'error' in response &&
    typeof (response as any).error.status === 'number'
  );
}
