import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import CarList from './assets/component/CarList';
import React from 'react'
import Login from './assets/component/Login';


const queryClient = new QueryClient(); 

const App = () => {
  return (
    <Container maxWidth='xl'>
      <AppBar position='static'> 
        <Toolbar> 
          <Typography variant="h3" style={{ textAlign: 'center', width: '100%' }}> 
            🚘 Car show 🚙
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}> 
      <Login />
      </QueryClientProvider>
      
    </Container>

  )
}

export default App
