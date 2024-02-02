import React, { useState } from 'react'
import axios from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Snackbar } from '@mui/material';
import deleteCar from '../../carapi';


type CarResponse = {
    make: string; 
    model: string; 
    color: string; 
    registerNumber: string;
    year: number;
    price: number; 
}


const CarList = () => {
    const QueryClient = useQueryClient();
    const [open,setOpen] =useState(false); 

    const getCars = async(): Promise<CarResponse[]> =>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
        return response.data;
    } 
    const {mutate} = useMutation(deleteCar, {
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: 
            ['cars']}); 
    
        }, 
        onError:(err) => {
            console.error(err); 
        }
    
      })


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
    {field: 'delete',
     headerName:'',
    sortable: false,
    filterable: false,
    renderCell: (params: GridCellParams) =>(
        <Button onClick= { ()=>{
        if(window.confirm(`Are you sure you want to delete ${params.row.make} ${params.row.model}?`)){
        mutate(params.row.id)
        }
    }
}color="error"> Delete </Button>
    )

    }
  ]


    if(!isSuccess) {
        return <h2> Loading... </h2>
    }else if(error){
        return <h2> Error when fetching cars... </h2>
    }else{ 
        return (
            <>
            <DataGrid
            rows ={data}
            columns={columms}
            sx={{ 
                boxShadow:2,
                border:2,
                borderColor:"primary.light",
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
            }}
            />
            <Snackbar open ={open}
            autoHideDuration={2000}
            message="Car deleted Successfully"
            onClose={()=>setOpen(false)}
            />
            </>
        )
    }
    }



export default CarList
