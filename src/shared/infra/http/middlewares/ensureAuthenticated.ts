import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const { secret } = authConfig.jwt;
  const [, token] = authHeader.split(' ');
  /* esse split retorna um array com duas posicoes que pode ser desestruturado,
  mas como nao queremos o primeiro é possivel deixar vazio + , e só pegar o segundo */
  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload; // as força com que a variavel tenha um tipo desejavel

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token');
  }
}
