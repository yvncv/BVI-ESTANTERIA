import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Libro = ({ libro, usuario, handleMostrarModal }) => {
    const colorMapping = {
        "CIVIL": "warning",
        "INFORMÁTICA": "primary",
        "INDUSTRIAL": "success",
        "MECATRÓNICA": "danger",
        "ELECTRÓNICA": "secondary",
    };

    const cardColor = colorMapping[libro.carrera] || "light";

    const handleAddToFavorites = async (libroId) => {
      try {
        const token = localStorage.getItem('authToken'); // Asegúrate de obtener el token de autenticación
    
        // Asegúrate de pasar el libroId como string, no como objeto
        const response = await axios.put(
          `http://localhost:4000/api/libros/${libroId}/favoritos`,
          {}, // No necesitas cuerpo en el PUT request para esta acción
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
            },
          }
        );
    
        console.log('Libro añadido a favoritos:', response.data);
      } catch (error) {
        console.error('Error al añadir a favoritos:', error);
      }
    };

    return (
        <div className="col-md p-3 mx-auto" key={libro._id}>
            <Card className="col-md p-3 mx-auto"
                style={{ width: '20rem' }}
                bg={cardColor}
                text={cardColor === 'light' || cardColor === 'warning' ? 'dark' : 'white'}
                border='dark'>
                <Card.Header style={{display: 'flex'}}>
                    INGENIERÍA {libro.carrera}, CICLO: {libro.ciclo}, CURSO: {libro.curso}

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic"></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleAddToFavorites(libro._id)}>Agregar a favoritos</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Leer más tarde</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Conseguir libro</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                </Card.Header>
                <Card.Img variant="top" style={{ height: '200px', objectFit: 'contain', padding: '10px' }} src={libro.portada ? libro.portada : "https://www.urp.edu.pe/img/thumbnails/wm/451/hm/162/we/451/he/162/x/0/y/0/s/0/q/90/zc/3/f/0/rgb/000000/src/37375/n/logo-urp.png"} />
                <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>{libro.titulo}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{libro.autor}</Card.Subtitle>
                    <Card.Subtitle>Publicado en: {libro.lugar}</Card.Subtitle>
                    <Card.Text>Clase: {libro.categoria}</Card.Text>
                    <Card.Link className="mb-3 btn btn-dark border-light" href={libro.enlace}>Lea el libro dando click aquí.</Card.Link>
                    {usuario && usuario.role === 'admin' && (
                        <Card.Footer className="d-flex justify-content-around">
                            <>
                                <Button className="btn btn-danger" onClick={() => handleMostrarModal(libro._id)}>
                                    Eliminar libro
                                </Button>
                                <Link className="btn btn-success" to={`/edit/${libro._id}`}>
                                    Editar
                                </Link>
                            </>
                        </Card.Footer>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Libro;