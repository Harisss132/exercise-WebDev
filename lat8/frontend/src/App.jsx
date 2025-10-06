import { useState } from 'react';
import { Container } from 'react-bootstrap';
import NavbarBook from './components/Navbar'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
    <NavbarBook />
    <Container className='mt-4'>
      <AppRoutes />
    </Container>
    </>
  )
}

export default App
