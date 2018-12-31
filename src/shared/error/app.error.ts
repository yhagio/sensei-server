export default abstract class AppError extends Error {
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}
