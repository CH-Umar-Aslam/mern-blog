import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navigation = () => {
  let token = localStorage.getItem("token");
  let username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    token = ""
    localStorage.removeItem("username")
    alert("Logedout Successfully");
    navigate("/login")
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-primary text-white">
      <Container>
        <Navbar.Brand className='text-white'> <h3>Umar's Blog</h3></Navbar.Brand>
        <Navbar.Toggle className='text-white' aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='text-white' id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className='text-white'>Home</Nav.Link>
            <Nav.Link as={Link} to="/add-category" className='text-white' >Add Category</Nav.Link>
            <Nav.Link as={Link} to="add-blog" className='text-white' >Add Blog</Nav.Link>
          </Nav>
          {token && token !== null ?
            <div className="d-flex justify-content-center " >
              <Nav.Link onClick={handleLogout} as={Link} to="/login" className='text-white mt-1' eventKey={2}>  Logout </Nav.Link>
              <button className='btn btn-primary ' >welcome:{username}</button>
            </div>
            :
            <Nav  >
              <Nav.Link as={Link} to="/register" className='text-white'>Register</Nav.Link>
              <Nav.Link as={Link} to="/login" className='text-white' eventKey={2}>Login</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Navigation;
