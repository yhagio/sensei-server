export interface ILogger {
  debug(...args: any): void;
  info(...args: any): void;
  warn(...args: any): void;
  error(...args: any): void;
}

export class Logger implements ILogger {
  constructor(private logger: ILogger) {}

  public debug(...args: any[]): void {
    this.logger.debug(...args);
  }
  public error(...args: any[]): void {
    this.logger.error(...args);
  }
  public info(...args: any[]): void {
    this.logger.info(...args);
  }
  public warn(...args: any[]): void {
    this.logger.warn(...args);
  }
}
