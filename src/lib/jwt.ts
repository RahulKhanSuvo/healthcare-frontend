/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
interface CustomJwtPayload extends JwtPayload {
  role: string;
  id: string;
  email: string;
}

const createToken = (
  payload: CustomJwtPayload,
  secret: string,
  { expiresIn }: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    return {
      success: true,
      data: decoded,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
};
const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as CustomJwtPayload;
  return decoded;
};
export const jwtUtils = {
  createToken,
  verifyToken,
  decodeToken,
};
