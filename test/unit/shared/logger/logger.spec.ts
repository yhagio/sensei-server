import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Logger, ILogger } from '../../../../src/shared/logger/logger';

chai.use(sinonChai);

const expect = chai.expect;

describe('Logger', () => {
  let logger: Logger;
  let loggerInterface: ILogger;

  beforeEach(() => {
    loggerInterface = {
      info: sinon.stub(),
      warn: sinon.stub(),
      error: sinon.stub(),
      debug: sinon.stub()
    };
    logger = new Logger(loggerInterface);
  });

  describe('info', () => {
    it('should delegate to loggerInterface', () => {
      const message = 'test';
      logger.info(message);
      expect(loggerInterface.info).to.have.been.calledWith(message);
    });
  });

  describe('warn', () => {
    it('should delegate to loggerInterface', () => {
      const message = 'test';
      logger.warn(message);
      expect(loggerInterface.warn).to.have.been.calledWith(message);
    });
  });

  describe('error', () => {
    it('should delegate to loggerInterface', () => {
      const message = 'test';
      logger.error(message);
      expect(loggerInterface.error).to.have.been.calledWith(message);
    });
  });

  describe('debug', () => {
    it('should delegate to loggerInterface', () => {
      const message = 'test';
      logger.debug(message);
      expect(loggerInterface.debug).to.have.been.calledWith(message);
    });
  });
});
