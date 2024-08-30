import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";
import { useTranslation } from "react-i18next";

export const Subcategories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    actions.getSubCategories();
  }, []);

  const handleBack = () => {
    navigate("/categories");
  };

  const handleSubmit = (selectedInput) => {
    actions.savedSelectedSubcategory(selectedInput);
    navigate("/colors");
  };

  return (
    <div className="container-fluid text-center mt-5 standard-div">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">{t("subcategories.title")}</h1>
          <Form
            labels={store.subcategories}
            actual={handleSubmit}
            route="/colors"
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};
