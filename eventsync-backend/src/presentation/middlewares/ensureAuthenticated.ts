// src/presentation/middlewares/ensureAuthenticated.ts
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../shared/config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token is missing" });
  }

  // Separa o "Bearer" do token
  const [, token] = authHeader.split(" ");

  // --- CORREÇÃO AQUI ---
  // Verifica se o token realmente existe antes de tentar usar
  if (!token) {
    return res.status(401).json({ error: "Token missing or malformed" });
  }

  try {
    // Agora o TypeScript sabe que 'token' é uma string garantida
    const decoded = verify(token, authConfig.secret as string);

    const { sub } = decoded as TokenPayload;

    // @ts-ignore
    req.user = { id: sub };

    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}