import { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";

export const Subcategories = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getSubCategories();
  }, []);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Subcategorías</h1>
          <div className="row">
            <Form
              labels={store.subcategories}
              actual={actions.savedSelectedSubcategory}
              route="/colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
