import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";
import { useTranslation } from "react-i18next";

export const Colors = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    actions.getColors();
  }, []);

  const handleSubmit = (selectedInput) => {
    actions.savedSelectedColor(selectedInput);
    navigate("/results");
  };

  const handleBack = () => {
    navigate("/subcategories");
  };

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">{t("colors.title")}</h1>
          <Form
            labels={store.colors}
            actual={handleSubmit}
            route="/results"
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};
