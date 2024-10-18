export interface Service{
    service_id?:number,
    name:string,
    catalogue_id:number,
    price:number,
    duration:number //duration in minutes - hours

}
export interface ServiceResponse{
  services: Service[]
}

export interface ServiceCreate{
    name:string,
    catalogue_id:number,
    price:number,
    duration:number
}

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getAllServices() {
    const response = await fetch(`${API_URL}/services`);
    const data: ServiceResponse = await response.json();
    return data;
}


export async function addService(create:ServiceCreate) {
    const response = await fetch(`${API_URL}/services/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: create.name,
          catalogue_id:create.catalogue_id,
          price:create.price,
          duration: create.duration
        }),
    });
    const responsedata= await response.json();
    return responsedata;

}