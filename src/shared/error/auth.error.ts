import AppError from './app.error';

export class UnauthorizedError extends AppError {
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
