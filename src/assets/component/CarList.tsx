import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';


type CarResponse = {
    make: string; 
    model: string; 
    color: string; 
    registerNumber: string;
    year: number;
    price: number; 
}

const CarList = () => {
    const getCars = async(): Promise<CarResponse[]> =>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);


        return response.data;

    } 
    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn:getCars 
    })
    const columms: GridColDef[]= [
        {field:'make',headerName :'Make',width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registerNumber', headerName: 'RegisterNum', width: 150},
    {field: 'Year', headerName: 'Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
  ]


    if(!isSuccess) {
        return <h2> Loading... </h2>
    }else if(error){
        return <h2> Error when fetching cars... </h2>
    }else{ 
        return (
            <DataGrid
            rows ={data}
            columns={columms}
            />
        )
    }
    }


export default CarList
