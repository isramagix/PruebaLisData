import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { useContext } from "react";
import { Context } from "../store/AppContext";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { t } = useTranslation();

  return (
    <div className="body">
      <h1 className="text-center my-5">{t("home.findProduct")}</h1>
      <section className="text-center">
        <h3>{t("home.clickToStart")}</h3>
        <button
          id="startBtn"
          className="btn btn-secondary mt-5 px-5 py-3"
          onClick={() => {
            actions.resetStore();
            navigate("/categories");
          }}
        >
          {t("home.start")}
        </button>
      </section>
    </div>
  );
};
