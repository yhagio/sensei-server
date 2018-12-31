import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { RequestHandler } from 'express';

import { jsonFormatter } from '../../../../src/web/utils/json.formatter';

chai.use(sinonChai);

const expect = chai.expect;

describe('jsonFormatter', () => {
  it('should create handler', () => {
    const handler = jsonFormatter();
    expect(handler).to.be.a('function');
  });

  describe('handles formatting', () => {
    let handler: RequestHandler;
    let res: any;
    let next: any;

    beforeEach(() => {
      handler = jsonFormatter();
      res = { json: sinon.stub(), status: sinon.stub() };
      next = sinon.stub();
    });

    it('should add formatter to response', () => {
      handler(undefined, res, next);
      expect(res.formattedJson).to.be.a('function');
      return expect(next).to.have.been.called;
    });

    describe('formatter', () => {
      let error: any;
      let data: string;

      beforeEach(() => {
        error = new Error('test');
        data = 'test';
        handler(undefined, res, next);
      });

      it('should should set data', () => {
        res.formattedJson(undefined, data);
        expect(res.json).to.have.been.calledWith({
          data
        });
      });

      it('should should set error with default status', () => {
        res.formattedJson(error, undefined);
        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({
          errors: [
            {
              code: error.name,
              message: error.message
            }
          ]
        });
      });

      it('should should set error with status', () => {
        error.status = 400;
        res.formattedJson(error, undefined);
        expect(res.status).to.have.been.calledWith(error.status);
        expect(res.json).to.have.been.calledWith({
          errors: [
            {
              code: error.name,
              message: error.message
            }
          ]
        });
      });
    });
  });
});
