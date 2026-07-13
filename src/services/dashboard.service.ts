/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminDashboardData } from "@/types/dashbaord.type";

export async function getDashboardData() {
  try {
    const response = await httpClient.get<IAdminDashboardData>("/stats");
    return response;
  } catch (error: any) {
    // console.error(error);
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching dashboard data.",
      data: null,
      meta: null,
    };
  }
}
