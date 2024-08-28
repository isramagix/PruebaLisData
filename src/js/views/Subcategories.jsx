import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";

export const Subcategories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Subcategorías</h1>
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
