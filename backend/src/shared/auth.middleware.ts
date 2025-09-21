import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Action } from "routing-controllers";

import { environment } from "@/config/environment";
import { User } from "@/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  // Skip authentication for auth endpoints and health check
  if (req.path.startsWith('/api/auth/') || req.path === '/api/health') {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  const token = authHeader.substring(7);

  jwt.verify(token, environment.jwtSecret, async (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }

    try {
      const { userId } = decoded as { userId: string };
      const user = await User.findByPk(userId);

      if (!user || !user.enabled) {
        res.status(403).json({ error: 'User not found or disabled' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Authentication error' });
      return;
    }
  });
}

export async function authorizationChecker(
  action: Action,
  roles: string[]
): Promise<boolean> {
  const user = action.request.user as User;

  if (!user) {
    return false;
  }

  if (roles.length === 0) {
    return true;
  }

  return roles.includes(user.role);
}

export async function currentUserChecker(action: Action): Promise<User | null> {
  return action.request.user || null;
}
