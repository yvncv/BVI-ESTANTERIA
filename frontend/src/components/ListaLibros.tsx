import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

interface Libro {
  _id: string;
  autor: string;
  titulo: string;
  editorial: string;
  categoria: string;
  enlace: string;
}

const ListaLibros = () => {
  const [lista, setLista] = useState<Libro[]>([]);

  useEffect(() => {
    const obtenerLibros = async () => {
      const res = await axios.get('http://localhost:4000/api/libros');
      setLista(res.data);
    };
    obtenerLibros();
  }, [lista]);

  const eliminarLibro = async (id: string) => {
    await axios.delete(`http://localhost:4000/api/libros/${id}`);
  };

  return (
    <div className="row">
      {lista.map((list) => (
        <div className="col-md-4 p-2" key={list._id}>
          <div className="card">
            <div className="card-header">Titulo: {list.titulo}</div>
            <div className="card-body">
              <p>Autor: {list.autor}</p>
              <p>Editorial: {list.editorial}</p>
              <p>Categoria: {list.categoria}</p>
              <p>Enlace: {list.enlace}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger" onClick={() => eliminarLibro(list._id)}>
                Eliminar libro
              </button>
              <Link className="btn btn-primary m-1" to={`/edit/${list._id}`}>
                Editar
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaLibros;