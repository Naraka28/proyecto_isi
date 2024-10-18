export interface Employee{
    employee_id?:number,
    name: string,
    last_name: string,
    access_email: string,
    personal_email: string,
    password: string,
    phone_number: string,
    role_id:number
}
export interface EmployeeResponse{
  employees: Employee[]
}

export interface EmployeeCreate{
    name: string,
    last_name: string,
    access_email: string,
    personal_email: string,
    password: string,
    phone_number: string,
    role_id:number
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllEmployees() {
    const response = await fetch(`${API_URL}/employees`);
    const data: EmployeeResponse = await response.json();
    return data;
}


export async function employeeAddService(create:EmployeeCreate) {
  console.log("Estoy al principio de userAddService");
  console.log("Datos del usuario:",create); // Agrega este log para ver los datos

    const response = await fetch(`${API_URL}/employees/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: create.name,
          last_name: create.last_name,
          access_email: create.access_email,
          personal_email: create.personal_email,
          password: create.password,
          phone_number:create.phone_number,
          role_id:create.role_id
        }),
    });
    console.log("ya apunto de terminar employeeAddService");
    const responsedata= await response.json();
    return responsedata;

}