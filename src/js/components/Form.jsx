import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Form = ({ labels, actual, route, onBack }) => {
  const [selectedInput, setSelectedInput] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (event) => {
    setSelectedInput(event.target.value);
    setShowWarning(false);
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
      <h2>{t("form.selectOption")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {labels.map((lab) => (
            <div key={lab.id}>
              <input
                id="option"
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
          <div className="alert alert-danger mt-3">{t("form.warning")}</div>
        )}

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-secondary me-2"
            id="backBtn"
            onClick={onBack}
          >
            {t("form.back")}
          </button>
          <button type="submit" className="btn btn-primary" id="nextBtn">
            {t("form.next")}
          </button>
        </div>
      </form>
    </div>
  );
};
