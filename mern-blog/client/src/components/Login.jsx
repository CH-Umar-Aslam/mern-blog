import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:9000/user/v1/api/login", loginInput)
      alert(res.data.message)
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/");

    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={6}> {/* Adjust the width for medium and large screens */}
          <div className="p-4 rounded" style={{ backgroundColor: 'white' }}>
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <input type="email" name="email" value={loginInput.email} placeholder="enter email"
                  onChange={(e) => setLoginInput(prevInput => ({
                    ...prevInput, [e.target.name]: e.target.value
                  }))} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-4">
                <input type='password' name="password" value={loginInput.password} placeholder="password"
                  onChange={(e) => setLoginInput(prevInput => ({
                    ...prevInput, [e.target.name]: e.target.value
                  }))} />

              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container >
  );
};

export default Login;
