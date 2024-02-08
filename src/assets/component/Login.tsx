import { Button, Stack, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"
import axios from "axios"
import CarList from "./CarList"
import { User } from "../../types"


const Login = () => {

    const [user, setUser] = useState<User>({
        username: '',
        password: '',
    })

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUser ({...user, [event.target.name]:event.target.value})
    }

    const handleLogin = () => {
        axios.post('http://localhost:8080/login', user, {
            headers: {'Content-Type':'application/json'}
        })
        .then (response => {
            const jwtToken = response.headers.authorization;
            if(jwtToken !== null){
                sessionStorage.setItem('jwt',jwtToken)
                setAuth(true)
            }
        })
        .catch(err => console.error(err))
    }

    if(isAuthenticated){
        return <CarList/>
    } else 
    return(
    <Stack spacing={2} alignItems='center' mt={2}>
        <TextField 
        name="username"
        label="username"
        onChange={handleChange}
        />
        <TextField 
        type="password"
        name="password"
        label="password"
        onChange={handleChange}
        />
        <Button variant="outlined" 
        color="primary"
        onClick={handleLogin}>Login</Button>
    </Stack>
    )
}

export default Login