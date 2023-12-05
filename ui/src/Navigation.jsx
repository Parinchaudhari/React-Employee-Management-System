import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <Navbar  expand="lg" className="bg-black">
        <Container>
          <Navbar.Brand className='text-white fs-4' href="#home">Employee Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className='sm-links text-white'>Home</Nav.Link>
              <Nav.Link as={Link} to="/create" className='sm-links text-white'>Create</Nav.Link>
              <Nav.Link as={Link} to="/filter" className='sm-links text-white'>Filter</Nav.Link>
              <Nav.Link as={Link} to="/RetirementTable" className='sm-links text-white'>Retiries</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
