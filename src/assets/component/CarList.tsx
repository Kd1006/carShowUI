import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CarResponse from "../../types.ts";
import { DataGrid,GridCellParams,GridColDef } from "@mui/x-data-grid";

import { Button, Snackbar } from "@mui/material";
import {deleteCar}  from "../../../carapi.ts";
import { getCars } from "../../../carapi.ts";
import { useState } from "react";
import Confirmation from "./confirmation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCar from "./AddCar.tsx";





const CarList = () => {

  const queryClient = useQueryClient()
  const[open,setOpen] =useState(false)
  const[openConfirmation,setOpenConfirmation] = useState(null)
  const[showSnakBar,setSnakBar] =useState(false)



  const {mutate} = useMutation(deleteCar,{
    onSuccess : () => {

      queryClient.invalidateQueries({queryKey:['cars']});
      setSnakBar(true);
    },
    onError : (err) => {
      console.error(err);
    }
  })


  const {data,error,isSuccess} = useQuery({
    queryKey: ["cars"],
    queryFn:getCars
  })

  


  const columns :GridColDef[] =[
    {field:'make',headerName :'Make',width: 200,headerClassName:'hs'  } ,
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registerNumber', headerName: 'Reg.nr.', width: 150},
    {field: 'year', headerName: 'Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
    //Carlist.tsx
{
  field: "delete",
  headerName: "",
  width: 90,
  sortable: false,
  filterable: false,
  renderCell: (params:GridCellParams) => (
    <>
   <Button color="error"
   onClick={()=>setOpenConfirmation({
    id:params.row.id,
    make:params.row.make,
  model:params.row.model
}) }
   ><DeleteForeverIcon/></Button>
   <Confirmation 
   open={openConfirmation?.id===params.row.id} 
   make={openConfirmation?.make}
   model={openConfirmation?.model}
   OnClose={()=>setOpenConfirmation(false)}
   onConfirm={()=> {
    mutate(params.row.id);
    setOpenConfirmation(false)}
  }
   >
   </Confirmation>
   </>
  )
}
  ]

  if(!isSuccess){
    return <h2> Loading ....</h2>
  } else if(error){
    return <h2>Error when fetching cars ...</h2>
  } else {
    return (
      <>
      <DataGrid 
      rows={data}
      columns={columns}
      sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
      />
      <Snackbar    open ={showSnakBar} 
      autoHideDuration={2000}
      onClose={()=>setSnakBar(false)}
      message=" Car deleted "
      style={{background:'red'}}
      />
      <AddCar/>
      </>
    )   
  }
}

export default CarList