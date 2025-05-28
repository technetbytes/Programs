export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof ApiError) {
    return { statusCode: error.statusCode, message: error.message };
  }
  console.error('Unexpected error:', error);
  return { statusCode: 500, message: 'Internal server error' };
};
