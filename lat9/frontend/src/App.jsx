import { useState } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import NavbarMovie from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
    <NavbarMovie />
      <Container className='mt-4'>
        <AppRoutes />
      </Container>
    </>
  )
}

export default App
