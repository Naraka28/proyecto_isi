export interface Employee {
  employee_id: number;
  name: string;
  last_name: string;
  access_email: string;
  personal_email: string;
  password: string;
  phone_number: string;
  role_id?: number;
  role?: string;
  token?: string;
}
export interface EmployeeResponse {
  employees: Employee[];
}

export interface EmployeeCreate {
  name: string;
  last_name: string;
  access_email: string;
  personal_email: string;
  password: string;
  phone_number: string;
  role_id: number;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllEmployees() {
  const response = await fetch(`${API_URL}/employees`);
  const data: EmployeeResponse = await response.json();
  return data;
}

export async function employeeAddService(create: EmployeeCreate) {
  const response = await fetch(`${API_URL}/employees/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: create.name,
      last_name: create.last_name,
      access_email: create.access_email,
      personal_email: create.personal_email,
      password: create.password,
      phone_number: create.phone_number,
      role_id: create.role_id,
    }),
  });

  const responsedata = await response.json();
  return responsedata;
}

export async function deleteEmployee(employee_id: number) {
  const response = await fetch(`${API_URL}/employees/${employee_id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
export async function updateEmployee(employee: Employee) {
  const response = await fetch(`${API_URL}/employees/${employee.employee_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: employee.name,
      last_name: employee.last_name,
      access_email: employee.access_email,
      personal_email: employee.personal_email,
      password: employee.password,
      phone_number: employee.phone_number,
      role_id: employee.role_id,
    }),
  });
  const data = await response.json();
  return data;
}
export async function searchEmployee(name: string) {
  const response = await fetch(`${API_URL}/employees/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
  const data = await response.json();
  return data;
}
