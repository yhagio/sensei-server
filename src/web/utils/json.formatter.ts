import { NextFunction, Request, RequestHandler, Response } from 'express';
import { internalErrorStatus } from '../../shared/constants';

export interface IJsonFormatterError {
  code: string;
  message: string;
}

export interface IJsonFormatterEnvelope {
  data?: any;
  errors?: IJsonFormatterError[];
}

export interface IJsonFormatter {
  formattedJson(err: Error, data: any): void;
}

export interface IJsonFormatterErrorStatus {
  [key: string]: number;
}

export function jsonFormatter(
  errorStatus: IJsonFormatterErrorStatus = {}
): RequestHandler {
  return (_: Request, res: Response & IJsonFormatter, next: NextFunction) => {
    res.formattedJson = (err: Error, data: any) => {
      const result: IJsonFormatterEnvelope = {};

      if (err) {
        const { status, name, message } = err as any;
        res.status(status || errorStatus[name] || internalErrorStatus);
        result.errors = [{ code: name, message }];
      } else {
        result.data = data;
      }
      res.json(result);
    };

    next();
  };
}
