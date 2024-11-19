export interface Appointment {
  appointment_id: number;
  date: string;
  name: string;
  last_name: string;
  em_name: string;
  em_last_name: string;
  servicio: string;
  hour: string;
  total_price: number;
  employee_id: number;
  service_id: number;
  user_id: number;
}

export interface AppointmentCalendar {
  appointment_id: number;
  date: string;
  name: string;
  last_name: string;
  em_name: string;
  em_last_name: string;
  servicio: string;
  catalogue: string;
  hour: string;
  total_price: number;
  employee_id: number;
  service_id: number;
  user_id: number;
}

export interface AppointmentResponse {
  appointments: Appointment[];
}
export interface AppointmentResponseCalendar {
  appointments: AppointmentCalendar[];
}
export interface AppointmentUpdate {
  appointment_id: number;
  date: string;
  user_id: number;
  hour: string;
  employee_id: number;
  service_id: number;
}

export interface AppointmentCreate {
  date: string;
  hour: string;
  user_id: number;
  employee_id: number;
  service_id: number;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllAppointments() {
  const response = await fetch(`${API_URL}/appointments`);
  const data: AppointmentResponse = await response.json();
  return data;
}

export async function getAppointmentsForCalendar() {
  const response = await fetch(`${API_URL}/appointments/calendar`);
  const data: AppointmentResponseCalendar = await response.json();
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
      hour: create.hour,
      employee_id: create.employee_id,
      service_id: create.service_id,
    }),
  });
  const responsedata = await response.json();
  return responsedata;
}

export async function updateAppointment(update: Appointment) {
  const response = await fetch(
    `${API_URL}/appointments/${update.appointment_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: update.date,
        user_id: update.user_id,
        hour: update.hour,
        employee_id: update.employee_id,
        service_id: update.service_id,
      }),
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteAppointment(id: number) {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
