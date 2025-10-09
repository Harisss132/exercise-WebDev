import React from 'react';
import { Container, Nav, Navbar }from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarMovie() {
  return (
    <Navbar expand="lg" variant='dark' bg='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>🎞️ Daftar Film</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/add'>Tambah Movie</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMovie;