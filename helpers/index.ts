interface Response {
  data?: object;
  error?: object;
  message: string;
  status: string;
  title: string;
  timestamp: string;
  program: string;
  version: string;
}

export const getSuccessObject = (data: object = {}, message: string = 'OK', status: string = 'success',
  title: string = ''): Response  => ({
  data,
  message,
  status,
  title,
  timestamp: Date.now().toString(),
  program: String(Deno.env.get("API_NAME")),
  version: String(Deno.env.get("API_VERSION")),
});

export const getErrorObject = (error: object = {}, message: string = 'ERROR', status: string = 'error',
  title: string = ''): Response => ({
  error,
  message,
  status,
  title,
  timestamp: Date.now().toString(),
  program: String(Deno.env.get("API_NAME")),
  version: String(Deno.env.get("API_VERSION")),
});