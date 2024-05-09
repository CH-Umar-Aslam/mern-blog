import axios from "axios"
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigator = useNavigate();

  const handleInput = async (e) => {
    e.preventDefault();

    console.log(input)
    try {
      const res = await axios.post("http://localhost:9000/user/v1/api/register", input);
      alert(res.data.message);
      navigator("/login")
      navi
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div className="w-40 p-4 rounded" style={{ backgroundColor: 'white', width: 'calc(40% + 50px)' }}> {/* Set width to 40% with extra 50px */}
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleInput} >
          <Form.Group controlId="formBasicUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={input.username} name="username" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={input.email} name="email" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={input.password} name="password" onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
