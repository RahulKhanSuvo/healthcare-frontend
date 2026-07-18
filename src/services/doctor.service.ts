"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctors.type";

export const getDoctors = async () => {
  const res = await httpClient.get<IDoctor[]>("/doctors");
  return res.data;
};
