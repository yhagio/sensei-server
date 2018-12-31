import AppError from './app.error';

export class ForbiddenError extends AppError {
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}
