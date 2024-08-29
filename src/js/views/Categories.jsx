import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";
import { useTranslation } from "react-i18next"; // Importar el hook de traducción

export const Categories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Inicializar el hook de traducción

  useEffect(() => {
    actions.getCategories();
  }, []);

  const handleSubmit = (selectedInput) => {
    actions.savedSelectedCategory(selectedInput);
    navigate("/subcategories");
  };

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">{t("categories.title")}</h1>{" "}
          {/* Utilizar la traducción */}
          <Form
            labels={store.categories}
            actual={handleSubmit}
            route="/subcategories"
            onBack={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
