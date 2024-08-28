import { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";

export const Categories = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCategories();
  }, []);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Categorías</h1>

          <div className="row">
            <Form
              labels={store.categories}
              actual={actions.savedSelectedCategory}
              route="/subcategories"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
