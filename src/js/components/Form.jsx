import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Form = ({ labels, actual, route }) => {
  const [selectedInput, setSelectedInput] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedInput(event.target.value);
    setShowWarning(false); // Ocultar aviso si el usuario selecciona una opción
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedInput) {
      setShowWarning(true);
    } else {
      actual(selectedInput);
      navigate(route);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Selecciona una Categoría</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {labels.map((lab) => (
            <div key={lab.id}>
              <input
                type="radio"
                name="category"
                value={lab.id}
                onChange={handleChange}
              />
              <label className="ms-2">{lab.name}</label>
            </div>
          ))}
        </div>

        {showWarning && (
          <div className="alert alert-danger mt-3">
            Por favor, selecciona una categoría antes de continuar.
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Enviar
        </button>
      </form>
    </div>
  );
};
