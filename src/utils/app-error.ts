export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const notFound = (message: string) => new AppError(404, message);

export const conflict = (message: string) => new AppError(409, message);

export const badRequest = (message: string, details?: unknown) => new AppError(400, message, details);
