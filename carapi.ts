import axios from "axios";
import  CarResponse, { Car } from "./src/types";




export const getCars = async():Promise<CarResponse[]> => { 
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`)
    return response.data;
}

 export const deleteCar = async (id:number):Promise<CarResponse> => {
    const response =await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
    return response.data; 
 }

export const addCar = async(car:Car):Promise<CarResponse> => { 
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/add`, car,{
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
    return response.data;


} 



// import axios from "axios";
// import {CarResponse} from 



// const deleteCar = async (link:string):Promise<CarResponse>  => {
//     const response =await
//     axios.delete(link); 
// }
// export default deleteCar; 