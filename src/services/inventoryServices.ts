export interface Material {
  material_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface MaterialResponse {
  materials: Material[];
}

export interface MaterialCreate {
  name: string;
  quantity: number;
  price: number;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export const getAllMaterials = async (): Promise<MaterialResponse> => {
  try {
    const response = await fetch(`${API_URL}/inventory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data: MaterialResponse = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export async function materialAddService(create: MaterialCreate) {
  const response = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: create.name,
      quantity: create.quantity,
      price: create.price,
    }),
  });
  const responseData = await response.json();
  return responseData;
}

export async function materialDeleteService(id: number) {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function materialFindById(id: number) {
  const response = await fetch(`${API_URL}/inventory/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function materialUpdateService(update: Material) {
  const response = await fetch(`${API_URL}/inventory/${update.material_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: update.name,
      quantity: update.quantity,
      price: update.price,
    }),
  });
  const responseData = await response.json();
  return responseData;
}
