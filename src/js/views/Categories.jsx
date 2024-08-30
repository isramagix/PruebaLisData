import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";
import { useTranslation } from "react-i18next";

export const Categories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    actions.getCategories();
  }, []);

  const handleSubmit = (selectedInput) => {
    actions.savedSelectedCategory(selectedInput);
    navigate("/subcategories");
  };

  return (
    <div className="container-fluid text-center mt-5 standard-div">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">{t("categories.title")}</h1>{" "}
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
