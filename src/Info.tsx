//set user
// user should have type
// get info about user
import React, {useState} from 'react'

type User = {
    id:number;
    name: string; 
    email: string; 
    password: string; 


}


const Info = () => {
const[user, setUser] = useState<User>({} as User); 
  return (
    <div> Info </div>
  )
}

export default Info

