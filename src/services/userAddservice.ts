export interface user {
  user_id: number;
  name: string;
  last_name: string;
  access_email: string;
  password: string;
  role_id: number;
  phone_number: string;
}
export interface UserResponse {
  users: user[];
}

export interface UserCreate {
  name: string;
  last_name: string;
  access_email: string;
  password: string;
  role_id: number;
  phone_number: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export const getAllUsers = async (): Promise<UserResponse> => {
  try {
    const respuesta = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      console.log(respuesta);
      throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
    }

    const datos: UserResponse = await respuesta.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export async function userAddService(create: UserCreate) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: create.name,
      last_name: create.last_name,
      access_email: create.access_email,
      password: create.password,
      role_id: create.role_id,
      phone_number: create.phone_number,
    }),
  });
  const responsedata = await response.json();
  return responsedata;
}

export async function userDeleteService(id: number) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responsedata = await response.json();
  return responsedata;
}

export async function userFindById(id: number) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responsedata = await response.json();
  return responsedata;
}

export async function userUpdateService(create: user) {
  const response = await fetch(`${API_URL}/users/${create.user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: create.name,
      last_name: create.last_name,
      access_email: create.access_email,
      password: create.password,
      role_id: create.role_id,
      phone_number: create.phone_number,
    }),
  });
  const responsedata = await response.json();
  return responsedata;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
