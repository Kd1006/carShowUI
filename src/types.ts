import { defaultShouldDehydrateMutation } from "@tanstack/react-query";
import { ChangeEvent } from "react";

type CarResponse = {
    make: string; 
    model: string; 
    color: string; 
    registerNumber: string;
    year: number;
    price: number; 
}
 export type DialogFromProps = {
    car: CarResponse; 
    handleChange:(event:ChangeEvent <HTMLInputElement>) => void
}


export type Car ={ 
    id: number; 
    make: string; 
    model: string; 
    color: string; 
    registerNumber: string;
    year: number;
    price: number; 
}
export default CarResponse;