import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Form = ({ labels, actual, route, onBack }) => {
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
      <h1>Selecciona una opción</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {labels.map((lab) => (
            <div key={lab.id}>
              <input
                type="radio"
                name="option"
                value={lab.id}
                onChange={handleChange}
              />
              <label className="ms-2">{lab.name}</label>
            </div>
          ))}
        </div>

        {showWarning && (
          <div className="alert alert-danger mt-3">
            Por favor, selecciona una opción antes de continuar.
          </div>
        )}

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onBack}
          >
            Atrás
          </button>
          <button type="submit" className="btn btn-primary">
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
