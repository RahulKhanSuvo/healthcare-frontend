"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctors.type";

export const getDoctors = async () => {
  try {
    const res = await httpClient.get<IDoctor[]>("/doctors");
    return res.data;
  } catch (error) {
    console.error("Error: error message", error)
  }
};
