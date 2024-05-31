import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Libro } from '../types/Libro';

const AgregarLibro = () => {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<Libro>({
    _id: '',
    carrera: '',
    ciclo: '',
    curso: '',
    autor: '',
    titulo: '',
    lugar: '',
    tipo: '',
    categoria: '',
    enlace: ''
  });

  useEffect(() => {
    if (id) {
      obtenerId(id);
    }
  }, [id]);

  const obtenerId = async (valorId: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/libros/${valorId}`);
      setLibro({
        _id: valorId,
        carrera: res.data.carrera,
        ciclo: res.data.ciclo,
        curso: res.data.curso,
        autor: res.data.autor,
        titulo: res.data.titulo,
        lugar: res.data.lugar,
        tipo: res.data.tipo,
        categoria: res.data.categoria,
        enlace: res.data.enlace
      });
    } catch (error) {
      console.error('Error al obtener el libro:', error);
    }
  };

  //editarLibro/actualizarLibro
  //eliminarLibro
  //verLibro

  // Aquí podrías tener tus funciones para manejar el envío de formularios, etc.

  return (
    <div>
      <h2>{id ? 'Editar Libro' : 'Agregar Libro'}</h2>
      <form>
        <div>
          <label htmlFor="carrera">Carrera:</label>
          <input
            type="text"
            id="carrera"
            name="carrera"
            value={libro.carrera}
            onChange={(e) => setLibro({ ...libro, carrera: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="ciclo">Ciclo:</label>
          <input
            type="text"
            id="ciclo"
            name="ciclo"
            value={libro.ciclo}
            onChange={(e) => setLibro({ ...libro, ciclo: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="curso">Curso:</label>
          <input
            type="text"
            id="curso"
            name="curso"
            value={libro.curso}
            onChange={(e) => setLibro({ ...libro, curso: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={libro.titulo}
            onChange={(e) => setLibro({ ...libro, titulo: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={libro.autor}
            onChange={(e) => setLibro({ ...libro, autor: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lugar">Lugar:</label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            value={libro.lugar}
            onChange={(e) => setLibro({ ...libro, lugar: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={libro.tipo}
            onChange={(e) => setLibro({ ...libro, tipo: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={libro.categoria}
            onChange={(e) => setLibro({ ...libro, categoria: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="enlace">Enlace:</label>
          <input
            type="text"
            id="enlace"
            name="enlace"
            value={libro.enlace}
            onChange={(e) => setLibro({ ...libro, enlace: e.target.value })}
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Guardar'}</button>
      </form>
    </div>
  );
};

export default AgregarLibro;
