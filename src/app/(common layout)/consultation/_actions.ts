"use server";
import { httpClient } from "@/lib/axios/httpClient";

export const getDoctors = async () => {
  const res = await httpClient.get("/doctors");
  return res.data;
};
