import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MahasiswaNavbar() {
  return (
    <Navbar expand="lg" variant="primary" bg="primary">
      <Container>
        <Navbar.Brand as={Link} to="/">
         🏫 Daftar Mahasiswa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add">
              Tambah Mahasiswa
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MahasiswaNavbar;
