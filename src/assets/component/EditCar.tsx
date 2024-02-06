import React, { ChangeEvent, useState } from 'react'
import { CarResponse, CarEntry } from '../../types';
import { Button } from '@mui/base';
import { Dialog, DialogActions, DialogTitle, colors } from '@mui/material';
import CarDialogContent from './CarDialogContent';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { updateCar } from '../../../carapi';
import { Car } from '../../types';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

type FormProps = {
    cardata: CarResponse; 
}



const EditCar = ({cardata}:FormProps ) => {

    const [car, setCar] = useState<Car>({
        id: 0,
        make: '', 
        model:'',
        color:'', 
        registerNumber: '', 
        year: 0, 
        price:0
    })
    const [open, setOpen] = useState(false); 
    const handleChange = (event: ChangeEvent<HTMLInputElement> )=> {
        setCar({...car, [event.target.name]:event.target.value})
    }
    const handleClose = ()=> { 
        setOpen(false); 
    }
    const handleOpen =()=> { 
        setCar({
            id : 0,
            make : cardata.make,
            model : cardata.model,
            color : cardata.color,
            registerNumber : cardata.registerNumber,
            year : cardata.year,
            price : cardata.price
        })
        setOpen(true)
    }

    const queryClient = useQueryClient();

    const {mutate}= useMutation(updateCar, {
        onSuccess : ()=> {
            queryClient.invalidateQueries(['cars']);
        },
        onError : (err)=> {
            console.error(err)
        }
    })

    const handleSave = ()=>{
        const url = cardata.id;
        const carEnrty : CarEntry={car,url}
        mutate (carEnrty)
        setCar({
            id: 0,
            make: '', 
            model:'',
            color:'', 
            registerNumber: '', 
            year: 0, 
            price:0
        })
        setOpen(false)
    }

  return (
   <>
   <Button onClick={handleOpen} color="primary"> <ModeEditIcon color='primary'/>  </Button>
   <Dialog open = {open} onClose={handleClose} >
    <DialogTitle > Edit Car </DialogTitle>
    <CarDialogContent car ={car} handleChange={handleChange}/>
   <DialogActions>
   <Button color="error" variant='contained'onClick={handleClose} > <CancelPresentationIcon color='error'/> </Button>
   <Button color="primary" variant='contained'onClick={handleSave} > <SaveAltIcon color='primary'/> </Button>
   </DialogActions>

   </Dialog>

   </>
  )
}

export default EditCar