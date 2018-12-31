import { expect } from 'chai';

import { NotFoundError } from '../../../../src/shared/error/not.found.error';
import { ForbiddenError } from '../../../../src/shared/error/forbidden.error';
import { UnauthorizedError } from '../../../../src/shared/error/auth.error';

describe('AppError', () => {
  describe('NotFoundError', () => {
    it('should be instantiable', () => {
      return expect(new NotFoundError('')).to.be.an.instanceOf(NotFoundError);
    });
  });

  describe('ForbiddenError', () => {
    it('should be instantiable', () => {
      return expect(new ForbiddenError('')).to.be.an.instanceOf(ForbiddenError);
    });
  });

  describe('UnauthorizedError', () => {
    it('should be instantiable', () => {
      return expect(new UnauthorizedError('')).to.be.an.instanceOf(
        UnauthorizedError
      );
    });
  });
});
