import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { name, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/auth/register', {
        name,
        password
      });
      // Manejar la respuesta del servidor (por ejemplo, redirigir al usuario a una página después del registro)
      setError('Registered successfully'); // Set success message
    } catch (error) {
      setError('Failed to register, User already exists'); // Set error message
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese su nombre" name="name" value={name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingrese su contraseña" name="password" value={password} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;