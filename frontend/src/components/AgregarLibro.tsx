import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Libro } from '../types/Libro';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';

const CrearLibro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

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


  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
    }
    else {
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
    }
  };


  return (
    <Container>
      <h2>{id ? 'Editar Libro' : 'Agregar Libro'}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formCarrera">
            <Form.Label>Carrera</Form.Label>
            <Form.Control
              as="select"
              name="carrera"
              onChange={capturarDatos}
              value={libro.carrera}
              required
            >
              <option value="">Seleccionar Carrera</option>
              <option value="INFORMÁTICA">INFORMÁTICA</option>
              <option value="CIVIL">CIVIL</option>
              <option value="INDUSTRIAL">INDUSTRIAL</option>
              <option value="ELECTRÓNICA">ELECTRÓNICA</option>
              <option value="MECATRÓNICA">MECATRÓNICA</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor, seleccione una carrera.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formCiclo">
            <Form.Label>Semestre</Form.Label>
            <Form.Control
              as="select"
              name="ciclo"
              onChange={capturarDatos}
              value={libro.ciclo}
              required
            >
              <option value="">Seleccionar Semestre</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor, seleccione un semestre.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formCurso">
            <Form.Label>Curso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Curso"
              name="curso"
              onChange={capturarDatos}
              value={libro.curso}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el nombre del curso.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título"
              name="titulo"
              onChange={capturarDatos}
              value={libro.titulo}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el título del libro.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formAutor">
            <Form.Label>Autor y Año</Form.Label>
            <Form.Control
              type="text"
              placeholder="Autor. (año)"
              name="autor"
              onChange={capturarDatos}
              value={libro.autor}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el autor y año de publicación.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formLugar">
            <Form.Label>Lugar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Editorial, País"
              name="lugar"
              onChange={capturarDatos}
              value={libro.lugar}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el lugar de publicación.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Documento PDF, página web..."
              name="tipo"
              onChange={capturarDatos}
              value={libro.tipo}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el tipo de documento.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Libro, Monografía, Artículo..."
              name="categoria"
              onChange={capturarDatos}
              value={libro.categoria}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese la categoría del documento.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEnlace">
            <Form.Label>Enlace</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enlace de acceso al libro"
              name="enlace"
              onChange={capturarDatos}
              value={libro.enlace}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el enlace de acceso al libro.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">{id ? 'Actualizar' : 'Guardar'}</Button>
      </Form>
    </Container>
  );
};

export default CrearLibro;