import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Libro } from '../types/Libro';

const CrearLibro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      obtenerLibro(id);
    }
  }, [id]);

  const obtenerLibro = async (valorId: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/libros/${valorId}`);
      if (res.data) {
        setLibro({
          _id: valorId,
          carrera: res.data.carrera || '',
          ciclo: res.data.ciclo || '',
          curso: res.data.curso || '',
          autor: res.data.autor || '',
          titulo: res.data.titulo || '',
          lugar: res.data.lugar || '',
          tipo: res.data.tipo || '',
          categoria: res.data.categoria || '',
          enlace: res.data.enlace || ''
        });
      } else {
        console.error('No se encontraron datos para el libro con id:', valorId);
      }
    } catch (error) {
      console.error('Error al obtener el libro:', error);
    }
  };

  const capturarDatos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLibro({ ...libro, [name]: value });
  };

  const guardarDatos = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:4000/api/libros/${id}`, libro);
        alert('Libro actualizado correctamente');
      } else {
        await axios.post('http://localhost:4000/api/libros', libro);
        alert('Libro creado correctamente');
      }
      navigate('/');
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      alert('Error al guardar el libro');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Libro' : 'Agregar Libro'}</h2>
      <form onSubmit={guardarDatos}>
        <div>
          <label htmlFor="carrera">Carrera:</label>
          <input
            type="text"
            id="carrera"
            name="carrera"
            value={libro.carrera}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="ciclo">Ciclo:</label>
          <input
            type="text"
            id="ciclo"
            name="ciclo"
            value={libro.ciclo}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="curso">Curso:</label>
          <input
            type="text"
            id="curso"
            name="curso"
            value={libro.curso}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={libro.titulo}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={libro.autor}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="lugar">Lugar:</label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            value={libro.lugar}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={libro.tipo}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={libro.categoria}
            onChange={capturarDatos}
          />
        </div>
        <div>
          <label htmlFor="enlace">Enlace:</label>
          <input
            type="text"
            id="enlace"
            name="enlace"
            value={libro.enlace}
            onChange={capturarDatos}
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Guardar'}</button>
      </form>
    </div>
  );
};

export default CrearLibro;