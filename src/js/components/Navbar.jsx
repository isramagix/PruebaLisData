import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Función para cambiar el idioma
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.checked ? "en" : "es");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
          {t("navbar.home")}
        </a>
        <div className="d-flex align-items-center">
          <label className="form-check-label me-2" htmlFor="language-switch">
            {t("navbar.language")}
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="language-switch"
              onChange={handleLanguageChange}
              checked={i18n.language === "en"}
            />
            <label className="form-check-label" htmlFor="language-switch">
              {i18n.language === "en" ? "EN" : "ES"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};
