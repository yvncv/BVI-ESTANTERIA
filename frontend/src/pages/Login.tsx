import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  setLoggedInUser: (username: string) => void;
}

const Login: React.FC<Props> = ({ setLoggedInUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const res = await axios.post('http://localhost:4000/api/auth/login', { name, password });
        localStorage.setItem('token', res.data.token);
        setLoggedInUser(name);
        navigate('/');
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            setError(error.response.data.msg);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            setError('No se recibió respuesta del servidor.');
        } else {
            // Algo pasó al configurar la solicitud
            setError('Error al iniciar sesión.');
        }
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese su nombre" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;