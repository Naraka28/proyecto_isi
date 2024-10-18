export interface Appointment{
    appointment_id?:number,
    date:string,
    catalogue_id:number,
    price:number,
    duration:number //duration in minutes - hours

}
export interface ServiceResponse{
  services: Appointment[]
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