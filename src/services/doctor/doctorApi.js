import { api } from "@/lib/apiCall";

// admin: get doctor table with pagination
export const getDoctorTable = async (page, limit) => {
  const res = await api.get(`/all-doctors?page=${page}&limit=${limit}`);
  return res.data;
};

// admin: delete doctor
export const deleteDoctor = async (id) => {
  const res = await api.delete(`/doctor/delDoctor/${id}`);
  return res.data;
};

// user: get all doctors (no pagination)
export const getAllDoctors = async () => {
  const res = await api.get("/all-doctors");
  return res.data;
};

// get doctor schedule
export const getDoctorSchedule = async (docId) => {
  const res = await api.get("/doctor/schedule", {
    params: { docId },
  });
  return res.data;
};

// doctor dashboard: count appointments
export const countAppointments = async () => {
  const res = await api.get("/doctor/count-appoint");
  return res.data;
};

// doctor dashboard: count patients
export const countPatients = async () => {
  const res = await api.get("/doctor/count-patient");
  return res.data;
};

// doctor: submit schedule
export const submitSchedule = async (payload) => {
  const res = await api.post("/doctor/schedule", payload);
  return res.data;
};

// doctor: submit doctor data form
export const submitDoctorData = async (formData) => {
  const res = await api.post("/doctor", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
