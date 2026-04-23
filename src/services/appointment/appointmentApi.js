import { api } from "@/lib/apiCall";

// admin: get appointment table with pagination
export const getAppointmentTable = async (page, limit) => {
  const res = await api.get(
    `/patient/all-appointment?page=${page}&limit=${limit}`
  );
  return res.data;
};

// admin dashboard / AdminTable: get all appointments (no pagination)
export const getAllAppointments = async () => {
  const res = await api.get("/patient/all-appointment");
  return res.data;
};
