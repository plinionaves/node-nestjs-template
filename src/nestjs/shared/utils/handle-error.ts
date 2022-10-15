import { ValidationError } from '@/core/domain/errors';
import { HttpException, HttpStatus } from '@nestjs/common';

export const handleError = (error: Error) => {
  if (error instanceof ValidationError) {
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }

  throw new HttpException(
    { code: 'errors.server_error' },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
