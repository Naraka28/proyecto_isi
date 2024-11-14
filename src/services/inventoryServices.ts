// Fetch all inventory items
export async function getAllInventoryItems() {
  const response = await fetch(`${API_URL}/inventory`);
  const data: InventoryResponse = await response.json();
  return data;
}

// Add a new inventory item
export async function addInventoryItem(create: InventoryCreate) {
  const response = await fetch(`${API_URL}/inventory/create`, {
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

// Delete an inventory item
export async function deleteInventoryItem(item_id: number) {
  const response = await fetch(`${API_URL}/inventory/${item_id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

// Update an inventory item
export async function updateInventoryItem(item: InventoryItem) {
  const response = await fetch(`${API_URL}/inventory/${item.item_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      
    }),
  });
  const data = await response.json();
  return data;
}
