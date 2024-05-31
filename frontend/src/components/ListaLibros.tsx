import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Libro } from "../types/Libro";
import Card from "react-bootstrap/esm/Card";
import { Button } from "react-bootstrap";

const ListaLibros = () => {
  const [lista, setLista] = useState<Libro[]>([]);

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/libros');
        console.log('Datos obtenidos del servidor:', res.data);
        setLista(res.data);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };
    obtenerLibros();
  }, []);

  const eliminarLibro = async (id: string) => {
    await axios.delete(`http://localhost:4000/api/libros/${id}`);
  };

  const librosRegistrados = lista.filter(libro => libro.enlace != null);

  return (
    <div className="row">
      {librosRegistrados.map((libro) => (
        <div className="col-md-4 p-2" key={libro._id}>
          <Card style={{ width: '20rem' }}>
              <p className="card-header">{libro.carrera}, ciclo {libro.ciclo}, {libro.curso}</p>
              <Card.Img variant="top" src="https://www.urp.edu.pe/img/thumbnails/wm/451/hm/162/we/451/he/162/x/0/y/0/s/0/q/90/zc/3/f/0/rgb/000000/src/37375/n/logo-urp.png" /> 
              <Card.Body>
              <Card.Title>{libro.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Autor: {libro.autor}</Card.Subtitle>
                <Card.Text>Editorial: {libro.lugar}</Card.Text>
                <Card.Text>Clase: {libro.categoria}</Card.Text>
                <Card.Link href={libro.enlace}>Lea el libro dando click aquí.</Card.Link>
              <Card.Footer>
                <Button className="btn btn-danger" onClick={() => eliminarLibro(libro._id)}>
                  Eliminar libro
                </Button>
                <Link className="btn btn-success m-1" to={`/edit/${libro._id}`}>
                  Editar
                </Link> 
              </Card.Footer>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ListaLibros;
