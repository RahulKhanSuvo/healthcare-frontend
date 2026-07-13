import type { cookies } from "next/headers";

export const setCookie = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  name: string,
  value: string,
  maxAgeInSeconds: number,
) => {
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: maxAgeInSeconds,
  });
};

export const getCookie = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  name: string,
) => {
  return cookieStore.get(name)?.value;
};

export const deleteCookie = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  name: string,
) => {
  cookieStore.delete(name);
};
