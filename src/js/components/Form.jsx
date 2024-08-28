import React, { act, useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";

export const Form = ({ labels, actual, route }) => {
  const { store, actions } = useContext(Context);
  const [selectedInput, setSelectedInput] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actual(selectedInput);
    navigate(route);
  };

  return (
    <div className="container mt-5">
      <h1>Selecciona una Categoría</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {labels.map((lab) => {
            return (
              <div key={lab.id}>
                <input
                  type="radio"
                  name="category"
                  value={lab.id}
                  onChange={handleChange}
                />
                <label>{lab.name}</label>
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};
