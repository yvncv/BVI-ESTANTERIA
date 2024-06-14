import React from "react";

const Busqueda = ({ busqueda, setBusqueda }) => {
  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">Buscar</span>
        </div>
        <input
          type="text"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
          value={busqueda}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Busqueda;