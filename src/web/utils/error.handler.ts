import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Logger } from '../../shared/logger/logger';
import { IJsonFormatter } from './json.formatter';

export default function errorHandler(logger: Logger): ErrorRequestHandler {
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
