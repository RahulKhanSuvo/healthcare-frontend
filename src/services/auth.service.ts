"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const getDoctor = async () => {
  const response = await httpClient.get("/doctors");
  return response.data;
};
