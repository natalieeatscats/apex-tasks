export type TApiError = {
  status: number;
  data: { detail: string };
};

export type TApiErrorResponse = {
  error: TApiError;
  isUnhandledError: boolean;
};
