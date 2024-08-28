import { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Form } from "../components/Form";

export const Colors = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getColors();
  }, []);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Colors</h1>
          <div className="row">
            <Form
              labels={store.colors}
              actual={actions.savedSelectedColor}
              route="/results"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
