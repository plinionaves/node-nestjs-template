import { BaseError, NotFoundError } from '@/core/domain/errors';
import { HttpException, HttpStatus } from '@nestjs/common';

export const handleError = (error: Error) => {
  if (error instanceof NotFoundError) {
    throw new HttpException(error, HttpStatus.NOT_FOUND);
  }

  if (error instanceof BaseError) {
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }

  console.log(error);

  throw new HttpException(
    { code: 'errors.server_error' },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
