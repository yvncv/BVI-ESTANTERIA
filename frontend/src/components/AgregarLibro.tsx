import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

interface Libro {
  autor: string;
  titulo: string;
  editorial: string;
  categoria: string;
  enlace: string;
}

const AgregarLibro = () => {
  const valorInicial: Libro = {
    autor: "",
    titulo: "",
    editorial: "",
    categoria: "",
    enlace: "",
  };

  let { id } = useParams<{ id: string }>();

  const [libro, setLibro] = useState<Libro>(valorInicial);
  const [idLibro, setIdLibro] = useState<string | undefined>(id);

  const capturarDatos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLibro({ ...libro, [name]: value });
  };

  const guardarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(libro);

    const postLibro = {
      autor: libro.autor,
      titulo: libro.titulo,
      editorial: libro.editorial,
      categoria: libro.categoria,
      enlace: libro.enlace
    };

    if (idLibro) {
      await axios.put(`http://localhost:4000/api/libros/${idLibro}`, postLibro);
    } else {
      await axios.post('http://localhost:4000/api/libros', postLibro);
    }

    setLibro({ ...valorInicial });
    setIdLibro("");
  };

  const obtenerId = async (valorId: string) => {
    const res = await axios.get(`http://localhost:4000/api/libros/${valorId}`);
    setLibro({
      autor: res.data.autor,
      titulo: res.data.titulo,
      editorial: res.data.editorial,
      categoria: res.data.categoria,
      enlace: res.data.enlace
    });
  };

  useEffect(() => {
    if (idLibro) {
      obtenerId(idLibro);
    }
  }, [idLibro]);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <div className="form-group">
            <label htmlFor="inputAutor">Autor</label>
            <input
              type="text"
              className="form-control"
              id="inputAutor"
              placeholder="Ingrese autor"
              required
              value={libro.autor}
              name="autor"
              onChange={capturarDatos}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputTitulo">Titulo</label>
            <input
              type="text"
              className="form-control"
              id="inputTitulo"
              placeholder="Ingrese titulo"
              required
              value={libro.titulo}
              name="titulo"
              onChange={capturarDatos}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEditorial">Editorial</label>
            <input
              type="text"
              className="form-control"
              id="inputEditorial"
              placeholder="Ingrese editorial"
              required
              value={libro.editorial}
              name="editorial"
              onChange={capturarDatos}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputCategoria">Categoría</label>
            <input
              type="text"
              className="form-control"
              id="inputCategoria"
              placeholder="Ingrese categoría"
              required
              value={libro.categoria}
              name="categoria"
              onChange={capturarDatos}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEnlace">Enlace</label>
            <input
              type="text"
              className="form-control"
              id="inputEnlace"
              placeholder="Ingrese enlace"
              required
              value={libro.enlace}
              name="enlace"
              onChange={capturarDatos}
            />
            <small id="emailHelp" className="form-text text-muted">
              Verificar que la fuente y los datos ingresados sean auténticos.
            </small>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Recuérdame
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary form-control"
            name="enviar"
          >
            {idLibro ? "Actualizar Libro" : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarLibro;