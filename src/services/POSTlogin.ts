const API_URL = import.meta.env.VITE_API_URL;
import { Employee } from "../services/employeeServices";
interface LoginResponse {
  employee?: Employee;
  success: boolean;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

// export const login = async (
//   credentials: LoginCredentials
// ): Promise<LoginResponse> => {
//   try {
//     const response = await fetch(`${API_URL}/employees/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password,
//       }),
//     });

//     // Verificar si la respuesta es exitosa
//     if (!response.ok) {
//       throw new Error(`Error en el login: ${response.statusText}`);
//     }

//     // Parsear la respuesta JSON
//     const data: LoginResponse = await response.json();

//     // Devolver los datos de la respuesta
//     return data;
//   } catch (error) {
//     console.error("Error al hacer login:", error);
//     throw error;
//   }
// };
export async function login(credentials: LoginCredentials) {
  try {
    const response = await fetch(`${API_URL}/employees/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });


    // Verifica si la respuesta no es satisfactoria
    if (!response.ok) {
      // Si es así, lanza un error que `onError` pueda capturar
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al hacer login:", error);
    throw error;
  }
}
