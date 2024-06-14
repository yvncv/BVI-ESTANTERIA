import React, { useEffect, useState } from "react";
import axios from 'axios';
import ModalEliminar from "../components/ModalEliminarLibro";
import {jwtDecode} from "jwt-decode";
import Libro from "../components/Libro";
import Busqueda from "../components/Busqueda";
import Paginacion from "../components/Paginacion";
import '../styles/ListaLibros.css'; // Importar el archivo CSS

const ListaLibros = () => {
  const [lista, setLista] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEliminarLibro, setIdEliminarLibro] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [librosPorPagina] = useState(6); // Número de libros por página

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUsuario(decoded.usuario);
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
      obtenerLibros();
    }
  }, [usuario]);

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
        setLista(prevLista => prevLista.filter(libro => libro._id !== idEliminarLibro));
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
      } finally {
        handleCerrarModal();
      }
    }
  };

  const librosRegistrados = lista.filter(libro => libro.enlace != null);

  const librosFiltrados = librosRegistrados.filter(libro => {
    const titulo = libro.titulo ? libro.titulo.toLowerCase() : "";
    const autor = libro.autor ? libro.autor.toLowerCase() : "";
    const lugar = libro.lugar ? libro.lugar.toLowerCase() : "";
    const curso = libro.curso ? libro.curso.toLowerCase() : "";
    const tipo = libro.tipo ? libro.tipo.toLowerCase() : "";
    const categoria = libro.categoria ? libro.categoria.toLowerCase() : "";
    const carrera = libro.carrera ? libro.carrera.toLowerCase() : "";

    const busquedaLower = busqueda.toLowerCase();

    return (
      titulo.includes(busquedaLower) ||
      autor.includes(busquedaLower) ||
      lugar.includes(busquedaLower) ||
      tipo.includes(busquedaLower) ||
      categoria.includes(busquedaLower) ||
      carrera.includes(busquedaLower) ||
      curso.includes(busquedaLower) 
    );
  });

  // Obtener libros actuales
  const indexOfLastLibro = currentPage * librosPorPagina;
  const indexOfFirstLibro = indexOfLastLibro - librosPorPagina;
  const librosActuales = librosFiltrados.slice(indexOfFirstLibro, indexOfLastLibro);

  // Cambiar página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {usuario ? (
          <p>Hola {usuario.nombre}, aquí tienes la lista de libros:</p>
        ) : (
          <p>Bienvenido, aquí tienes la lista de libros:</p>
        )}
      </div>
      <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className="row">
        {librosActuales.map((libro) => (
          <Libro
            key={libro._id}
            libro={libro}
            usuario={usuario}
            handleMostrarModal={handleMostrarModal}
          />
        ))}
        <ModalEliminar
          show={mostrarModal}
          handleClose={handleCerrarModal}
          handleConfirm={eliminarLibro}
        />
      </div>
      <Paginacion
        currentPage={currentPage}
        totalPages={Math.ceil(librosFiltrados.length / librosPorPagina)}
        onPageChange={paginate}
      />
    </>
  );
};

export default ListaLibros;