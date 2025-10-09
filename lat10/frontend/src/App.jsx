import { useState } from 'react'
import { Container } from 'react-bootstrap';
import MahasiswaNavbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <>
      <MahasiswaNavbar/>
      <Container>
        <AppRoutes />
      </Container>      
    </>
  )
}

export default App
