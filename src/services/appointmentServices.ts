export interface Appointment {
  appointment_id?: number;
  date: string;
  name: string;
  last_name: string;
  material: string;
  em_name: string;
  em_last_name: string;
  servicio: string;
  total_price: number;
}
export interface AppointmentResponse {
  appointments: Appointment[];
}

export interface AppointmentCreate {
  date: string;
  user_id: number;
  material_id: number;
  ticket_id: number;
  employee_id: number;
  service_id: number;
  total_price: number;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllAppointments() {
  const response = await fetch(`${API_URL}/appointments`);
  const data: AppointmentResponse = await response.json();
  return data;
}

export async function searchUser(search: string) {
  const response = await fetch(`${API_URL}/users/phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: search,
    }),
  });
  const data = await response.json();
  return data;
}

export async function appointmentAddService(create: AppointmentCreate) {
  const response = await fetch(`${API_URL}/appointments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: create.date,
      user_id: create.user_id,
      material_id: create.material_id,
      ticket_id: create.ticket_id,
      employee_id: create.employee_id,
      service_id: create.service_id,
      total_price: create.total_price,
    }),
  });
  const responsedata = await response.json();
  return responsedata;
}
