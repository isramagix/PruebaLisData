import "../../styles/index.css";
import { imagesObjet } from "../../assets/images";
import { Context } from "../store/AppContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next"; // Importar el hook de traducción

export const ProductCard = ({ product }) => {
  const { store } = useContext(Context);
  const { t } = useTranslation(); // Inicializar el hook de traducción

  const imageCard =
    imagesObjet.find((image) => image.id === store.selectSubcategory)?.url ||
    "https://via.placeholder.com/540x300";

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(product.average_rating)) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div
      key={product.id}
      className="card mb-3 mx-auto"
      style={{ maxWidth: "540px" }}
    >
      <img
        src={imageCard}
        className="card-img-top"
        alt={product.name}
        style={{ maxHeight: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          <strong>{t("productCard.remaining")}</strong> {product.stock_quantity}{" "}
          {t("productCard.units")}
        </p>
        <p className="card-text">
          <strong>{t("productCard.freeShipping")}</strong>{" "}
          {product.is_free_shipping
            ? t("productCard.yes")
            : t("productCard.no")}
        </p>
        <p className="card-text">
          <strong>{t("productCard.price")}</strong> {product.price} €
        </p>
        <div className="product-rating">{renderStars()}</div>
      </div>
    </div>
  );
};
