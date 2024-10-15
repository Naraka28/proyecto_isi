export interface responseUser{
    user_id:number,
    name:string,
    last_name: string,
    access_email: string,
    password: string,
    role_id: number,
    phone_number: string
}

export interface userCreate{
  name:string,
  last_name: string,
  access_email: string,
  password: string,
  role_id: number,
  phone_number: string
}

const API_URL = import.meta.env.VITE_API_URL as string;


export const getAllUsers = async ():Promise<responseUser> => {
  try {
    const respuesta = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      
    });

    if (!respuesta.ok) {
      console.log(respuesta)
      throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
    }

    const datos: responseUser = await respuesta.json();
    console.log(datos)
    return datos;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};



export async function userAddService(create:userCreate) {
  console.log("Estoy al principio de userAddService");
  console.log("Datos del usuario:",create); // Agrega este log para ver los datos

    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: create.name,
          last_name: create.last_name,
          access_email: create.access_email,
          password: create.password,
          role_id:create.role_id,
          phone_number:create.phone_number
        }),
    });
    console.log("ya apunto de terminar userAddService");
    const responsedata= await response.json();
    return responsedata;

}