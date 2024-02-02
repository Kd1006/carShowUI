import axios from "axios";
import {CarResponse} from './type'; 


const deleteCar = async (link:string):Promise<CarResponse>  => {
    const response =await
    axios.delete(link); 
}
export default deleteCar; 