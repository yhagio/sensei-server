import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ErrorRequestHandler } from 'express';

import errorHandler from '../../../../src/web/utils/error.handler';
import { ILogger } from '../../../../src/shared/logger/logger';

chai.use(sinonChai);

const expect = chai.expect;

describe('errorHandler', () => {
  let logger: ILogger;

  beforeEach(() => {
    logger = {
      info: sinon.stub(),
      warn: sinon.stub(),
      error: sinon.stub(),
      debug: sinon.stub()
    };
  });

  it('should create error handler', () => {
    const errHandler = errorHandler(logger);
    expect(errHandler).to.be.a('function');
  });

  describe('handles error', () => {
    let errHandler: ErrorRequestHandler;
    let res: any;
    let error: any;

    beforeEach(() => {
      errHandler = errorHandler(logger);
      res = { formattedJson: sinon.stub() };
      error = new Error('some error');
    });

    it('should log the error', () => {
      errHandler(error, undefined, res, undefined);
      const { status, name, message, stack } = error;
      expect(logger.error).to.have.been.calledWith({
        status,
        name,
        message,
        stack
      });
    });

    it('should format response', () => {
      errHandler(error, undefined, res, undefined);
      expect(res.formattedJson).to.have.been.calledWith(error);
    });
  });
});
