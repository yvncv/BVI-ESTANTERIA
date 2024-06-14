import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Libro = ({ libro, usuario, handleMostrarModal }) => {
  const colorMapping = {
    "CIVIL": "warning",
    "INFORMÁTICA": "primary",
    "INDUSTRIAL": "success",
    "MECATRÓNICA": "danger",
    "ELECTRÓNICA": "secondary",
  };

  const cardColor = colorMapping[libro.carrera] || "light";

  return (
    <div className="col-md p-3 mx-auto" key={libro._id}>
      <Card
        style={{ width: '20rem' }}
        bg={cardColor}
        text={cardColor === 'light' ? 'dark' : 'white'}
        border='dark'>
        <Card.Header>
          INGENIERÍA {libro.carrera}, CICLO: {libro.ciclo}, CURSO: {libro.curso}
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