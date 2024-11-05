export interface Product {
  product_id: number;
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

export async function addProduct(create: Product) {
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
