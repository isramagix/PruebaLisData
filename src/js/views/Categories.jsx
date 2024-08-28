import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";

export const Categories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
          <h1 className="mt-5">Categorías</h1>
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
