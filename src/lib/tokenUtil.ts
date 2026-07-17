import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookiesUtils";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const getTokenSecondRemaining = (token: string, secret?: string): number => {
  if (!token || token === null) return 0;
  const resolvedSecret = secret ?? JWT_ACCESS_SECRET;
  try {
    const tokenPayload = resolvedSecret
      ? (jwt.verify(token, resolvedSecret) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);
    if (!tokenPayload || !tokenPayload.exp) {
      return 0;
    }
    const remainingSecond =
      (tokenPayload.exp as number) - Math.floor(Date.now() / 1000);
    return remainingSecond > 0 ? remainingSecond : 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getSecretForToken = (name: string): string | undefined => {
  if (name === "refreshToken") return JWT_REFRESH_SECRET;
  return JWT_ACCESS_SECRET;
};

export const setTokenInCookies = async (
  name: string,
  token: string,
  fallback = 60 * 60 * 24,
) => {
  let maxAgeSeconds = 0;
  if (name !== "better-auth.session_token") {
    maxAgeSeconds = getTokenSecondRemaining(token, getSecretForToken(name));
  }
  await setCookie(name, token, maxAgeSeconds ? maxAgeSeconds : fallback);
};

export function isTokenExpiringSoon(
  token: string,
  thresholdSeconds = 300,
): boolean {
  const remainingSecond = getTokenSecondRemaining(token);
  return remainingSecond > 0 && remainingSecond <= thresholdSeconds;
}

export function isTokenExpired(token: string): boolean {
  return getTokenSecondRemaining(token) === 0;
}
