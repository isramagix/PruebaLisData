import "../../styles/index.css";

export const Home = () => {
  return (
    <div className="body">
      <h1 className="text-center my-5">¡Encuentra tu producto ideal!</h1>
      <section className=" text-center">
        <h3>
          Haz click en el botón para realizar un cuestionario y obtener las
          mejores recomendaciones
        </h3>
        <button className="btn btn-main">Empezar</button>
      </section>
    </div>
  );
};
