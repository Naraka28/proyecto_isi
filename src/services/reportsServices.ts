export interface BestSellers {
  id?: number;
  name: string;
  contador: number;
}

export interface BestSellersResponse {
  bestSellers: BestSellers[];
}

export interface PriceList {
  id?: number;
  item_name: string;
  tipo: string;
  precio: string;
}

export interface PriceListResponse {
  priceList: PriceList[];
}

export interface InventoryReport {
  id?: number;
  item_name: string;
  tipo: string;
  cantidad: number;
  price: string;
  total: number;
}

export interface InventoryReportResponse {
  inventory: InventoryReport[];
  total: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getBestSellerProducts() {
  const response = await fetch(`${API_URL}/products/reports/topProduct`);
  const data: BestSellersResponse = await response.json();
  return data;
}

export async function getMostWantedEmployee() {
  const response = await fetch(`${API_URL}/products/reports/topEmployee`);
  const data: BestSellersResponse = await response.json();
  return data;
}

export async function getMostWantedServices() {
  const response = await fetch(`${API_URL}/products/reports/topService`);
  const data: BestSellersResponse = await response.json();
  return data;
}

export async function getPriceList() {
  const response = await fetch(`${API_URL}/products/reports/prices`);
  const data: PriceListResponse = await response.json();
  return data;
}

export async function getInventoryList() {
  const response = await fetch(`${API_URL}/products/reports/inventory`);
  const data: InventoryReportResponse = await response.json();
  return data;
}
