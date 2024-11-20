/*export interface Material {
  material_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface MaterialResponse {
  materials: Array<{
    material_id: number;
    name: string;
    quantity: number;
    price: string;
  }>;
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
      // Agregar más contexto al error para depuración.
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: MaterialResponse = await response.json();

    // Validar estructura de datos (opcional).
    if (!data || !Array.isArray(data.materials)) {
      console.log("Respuesta del servidor:", data);

      throw new Error("Estructura de datos inesperada en la respuesta.");
    }

    return {
      materials: data.inventory,
    };

  } catch (error: unknown) {
    // Diferenciar errores de red o de lógica.
    if (error instanceof Error) {
      console.error("Error al obtener datos:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
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
*/

// Definir las interfaces correctamente para los materiales y respuestas de la API
export interface Material {
  material_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface MaterialResponse {
  inventory: Material[];
}

export interface MaterialCreate {
  name: string;
  quantity: number;
  price: number;
}

// URL de la API
const API_URL = import.meta.env.VITE_API_URL as string;

// Servicio para obtener todos los materiales
export const getAllMaterials = async (): Promise<MaterialResponse> => {
  try {
    const response = await fetch(`${API_URL}/inventory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: MaterialResponse = await response.json();

    // Validar que la estructura de los datos es correcta
    if (!data || !Array.isArray(data.inventory)) {
      console.log("Respuesta del servidor:", data);
      throw new Error("Estructura de datos inesperada en la respuesta.");
    }

    // Retornar los datos correctamente
    return {
      inventory: data.inventory,
    };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error("Error al obtener datos:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};

// Servicio para agregar un nuevo material
export async function materialAddService(create: MaterialCreate) {
  try {
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

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al agregar material:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
}

// Servicio para eliminar un material por su ID
export async function materialDeleteService(id: number) {
  try {
    const response = await fetch(`${API_URL}/inventory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al eliminar material:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
}

// Servicio para buscar un material por su ID
export async function materialFindById(id: number) {
  try {
    const response = await fetch(`${API_URL}/inventory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al buscar material por ID:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
}

// Servicio para actualizar un material
export async function materialUpdateService(update: Material) {
  try {
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

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al actualizar material:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
}
