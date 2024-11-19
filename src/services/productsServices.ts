export interface Product {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}
export interface ProductCreate {
  name: string;
  quantity: number;
  price: number;
}
export interface ProductResponse {
  products: Product[];
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  const data: ProductResponse = await response.json();
  return data;
}

export async function addProduct(create: ProductCreate) {
  console.log(create);
  const response = await fetch(`${API_URL}/products`, {
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
  const responsedata = await response.json();
  return responsedata;
}

export async function deleteProduct(product_id: number) {
  const response = await fetch(`${API_URL}/products/${product_id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
export async function updateProduct(create: Product) {
  const response = await fetch(`${API_URL}/products/${create.product_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: create.name,
      quantity: create.quantity,
      price: create.price,
    }),
  });
  const data = await response.json();
  return data;
}
export async function searchProduct(name: string) {
  const response = await fetch(`${API_URL}/products/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
  const data: ProductResponse = await response.json();
  return data;
}
