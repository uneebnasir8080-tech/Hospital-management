import { api } from "@/lib/apiCall";

// in admin get patient table with pagination 
export const getPaitentTable = async (page, limit) => {
  const res = await api.get(`/all-patient?page=${page}&limit=${limit}`);
  return res.data;
};

// in admin create new patient 
export const createPatient = async (data) => {
  const res = await api.post("/create", data);
  return res.data;
};

// in admin add patient data form 
export const addPatient = async (formData, id) => {
  const res = await api.post("/patient", formData, {
    params: { id: String(id) },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// delete patient in admin side patient table 
export const deletePatient = async (id) => {
  const res = await api.delete(`/patient/${id}`);
  return res.data;
};

// get patient appointments (user side)
export const getPatientAppointments = async (userId) => {
  const res = await api.get("/patient/appointment", {
    params: { userId },
  });
  return res.data;
};

// get medicines list (user side)
export const getMedicines = async () => {
  const res = await api.get("/patient/medicine");
  return res.data;
};

// book a new appointment
export const bookAppointment = async (payload) => {
  const res = await api.post("/patient/appointment", payload);
  return res.data;
};

// submit patient data form
export const submitPatientData = async (formData, id) => {
  const res = await api.post("/patient", formData, {
    params: { id },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// update user profile
export const updateUserProfile = async (formData, id) => {
  const res = await api.put("/update-user", formData, {
    params: { id },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};