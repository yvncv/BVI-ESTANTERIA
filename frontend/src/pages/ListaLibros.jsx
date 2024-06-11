import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import ModalEliminar from "../components/ModalEliminarLibro";
import { jwtDecode } from "jwt-decode";

const ListaLibros = () => {
  const [usuario, setUsuario] = useState(null); // Estado local para el usuario
  const [lista, setLista] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEliminarLibro, setIdEliminarLibro] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUsuario(decoded.user);
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    };

    obtenerUsuario();
  }, []);

  useEffect(() => {
    if (usuario) {
      console.log(`Bienvenido, ${usuario.nombre}`);
      obtenerLibros(); // Llamar a la función para obtener los libros una vez que se haya cargado el usuario
    }
  }, [usuario]); // Ejecutar este efecto cuando `usuario` cambie

  const obtenerLibros = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/libros');
      console.log('Datos obtenidos del servidor:', res.data);
      setLista(res.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const handleMostrarModal = (id) => {
    setIdEliminarLibro(id);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setIdEliminarLibro(null);
  };

  const eliminarLibro = async () => {
    if (idEliminarLibro) {
      try {
        await axios.delete(`http://localhost:4000/api/libros/${idEliminarLibro}`);
        // Actualizar la lista de libros en el estado
        setLista(prevLista => prevLista.filter(libro => libro._id !== idEliminarLibro));
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
      } finally {
        handleCerrarModal();
      }
    }
  };

  const librosRegistrados = lista.filter(libro => libro.enlace != null);

  return (
    <>
      <div>
        {/* Mensaje de bienvenida */}
        {usuario ? (
          <p>Hola {usuario.nombre}, aquí tienes la lista de libros:</p>
        ) : (
          <p>Bienvenido, aquí tienes la lista de libros:</p>
        )}
      </div>
      <div className="row">
        {librosRegistrados.map((libro) => (
          <div className="col-md p-3 mx-auto" key={libro._id}>
            <Card
              style={{ width: '20rem' }}
              bg='light'
              key='light'
              text='dark'
              border="success">
              <Card.Header className="bg-dark text-light">
                INGENIERÍA {libro.carrera}, CICLO: {libro.ciclo}, CURSO: {libro.curso}
              </Card.Header>
              <Card.Img variant="top" src={libro.portada ? libro.portada : "https://www.urp.edu.pe/img/thumbnails/wm/451/hm/162/we/451/he/162/x/0/y/0/s/0/q/90/zc/3/f/0/rgb/000000/src/37375/n/logo-urp.png"} />
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>{libro.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Autor: {libro.autor}</Card.Subtitle>
                <Card.Text>Editorial: {libro.lugar}</Card.Text>
                <Card.Text>Clase: {libro.categoria}</Card.Text>
                <Card.Link className="mb-3 btn btn-warning" href={libro.enlace}>Lea el libro dando click aquí.</Card.Link>
                <Card.Footer className="d-flex justify-content-around">
                  <Button className="btn btn-danger" onClick={() => handleMostrarModal(libro._id)}>
                    Eliminar libro
                  </Button>
                  <Link className="btn btn-success" to={`/edit/${libro._id}`}>
                    Editar
                  </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </div>
        ))}
        <ModalEliminar
          show={mostrarModal}
          handleClose={handleCerrarModal}
          handleConfirm={eliminarLibro}
        />
      </div>
    </>
  );
};

export default ListaLibros;