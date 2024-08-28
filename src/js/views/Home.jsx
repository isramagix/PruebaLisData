import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { useContext } from "react";
import { Context } from "../store/AppContext";

export const Home = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  return (
    <div className="body">
      <h1 className="text-center my-5">¡Encuentra tu producto ideal!</h1>
      <section className=" text-center">
        <h3>
          Haz click en el botón para realizar un cuestionario y obtener las
          mejores recomendaciones
        </h3>
        <button
          className="btn btn-main"
          onClick={() => {
            actions.resetStore();
            navigate("/categories");
          }}
        >
          Empezar
        </button>
      </section>
    </div>
  );
};
