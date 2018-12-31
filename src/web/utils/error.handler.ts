import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ILogger } from '../../shared/logger/logger';
import { IJsonFormatter } from './json.formatter';

export default function errorHandler(logger: ILogger): ErrorRequestHandler {
  return (
    err: any,
    _: Request,
    res: Response & IJsonFormatter,
    __: NextFunction
  ) => {
    const { status, name, message, stack } = err;
    logger.error({ status, name, message, stack });
    res.formattedJson(err, undefined);
  };
}
