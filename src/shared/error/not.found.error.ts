import AppError from './app.error';

export class NotFoundError extends AppError {
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
