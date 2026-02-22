"use server"

import { api } from "@/lib/apiCall";
import { revalidatePath } from "next/cache";

export async function deleteAppointment(formData) {
  try {
    const id = formData.get("id");
  const token = formData.get("token");
    await api.delete(`/doctor/appointment`, {
        params:{
            id
        },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Refresh page data
    revalidatePath("/admin/appointment","page");

    return { success: true };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to delete appointment",
    };
  }
}

