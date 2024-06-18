import React from "react";
import { Form } from "react-bootstrap";

const FiltroCiclo = ({ libros, filtro, setFiltro }) => {
    // Obtener todos los ciclos disponibles
    const ciclos = [...new Set(libros.map(libro => libro.ciclo))];

    // Función para manejar el cambio en el selector de ciclo
    const handleChange = (event) => {
        setFiltro(event.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="form-group">
                <label htmlFor="cicloSelector">Selecciona un ciclo:</label>
                <Form.Select
                    id="cicloSelector"
                    className="form-control"
                    value={filtro} // Usamos filtro en lugar de cicloSeleccionado
                    onChange={handleChange}
                >
                    <option value="Todos">Todos los ciclos</option>
                    {ciclos.map((ciclo, index) => (
                        <option key={index} value={ciclo}>{ciclo}</option>
                    ))}
                </Form.Select>
            </div>
        </div>
    );
};

export default FiltroCiclo;