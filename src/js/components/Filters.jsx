import "../../styles/index.css";
import { useTranslation } from "react-i18next"; // Importar el hook de traducción

export const Filters = ({
  selectedPriceRanges,
  freeShipping,
  selectedRatings,
  selectedStockQuantities,
  onPriceRangeChange,
  onFreeShippingChange,
  onRatingChange,
  onStockQuantityChange,
}) => {
  const { t } = useTranslation(); // Inicializar el hook de traducción

  const priceRanges = [
    { label: t("filters.priceRanges.0-100"), value: "0-100" },
    { label: t("filters.priceRanges.100-300"), value: "100-300" },
    { label: t("filters.priceRanges.300-500"), value: "300-500" },
    { label: t("filters.priceRanges.500-1000"), value: "500-1000" },
    { label: t("filters.priceRanges.1000+"), value: "1000+" },
  ];

  const ratings = [
    { label: t("filters.ratings.1_star"), value: 1 },
    { label: t("filters.ratings.2_stars"), value: 2 },
    { label: t("filters.ratings.3_stars"), value: 3 },
    { label: t("filters.ratings.4_stars"), value: 4 },
    { label: t("filters.ratings.5_stars"), value: 5 },
  ];

  const stockQuantities = [
    { label: t("filters.stockQuantities.0-50"), value: "0-50" },
    { label: t("filters.stockQuantities.51-100"), value: "51-100" },
    { label: t("filters.stockQuantities.101-200"), value: "101-200" },
    { label: t("filters.stockQuantities.200+"), value: "200+" },
  ];

  const handlePriceRangeChange = (value) => {
    const updatedRanges = selectedPriceRanges.includes(value)
      ? selectedPriceRanges.filter((range) => range !== value)
      : [...selectedPriceRanges, value];
    onPriceRangeChange(updatedRanges);
  };

  const handleRatingChange = (value) => {
    const updatedRatings = selectedRatings.includes(value)
      ? selectedRatings.filter((r) => r !== value)
      : [...selectedRatings, value];
    onRatingChange(updatedRatings);
  };

  const handleStockQuantityChange = (value) => {
    const updatedStockQuantities = selectedStockQuantities.includes(value)
      ? selectedStockQuantities.filter((sq) => sq !== value)
      : [...selectedStockQuantities, value];
    onStockQuantityChange(updatedStockQuantities);
  };

  return (
    <div className="filters-container p-3">
      <h5 className="filters-title mb-4">{t("filters.filterBy")}</h5>

      {/* Filtro por precio */}
      <div className="filter-group mb-4">
        <h6 className="filter-subtitle">{t("filters.price")}</h6>
        {priceRanges.map((range) => (
          <div className="form-check" key={range.value}>
            <input
              type="checkbox"
              id={`price-${range.value}`}
              className="form-check-input"
              checked={selectedPriceRanges.includes(range.value)}
              onChange={() => handlePriceRangeChange(range.value)}
            />
            <label
              htmlFor={`price-${range.value}`}
              className="form-check-label"
            >
              {range.label}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro por envío gratuito */}
      <div className="filter-group mb-4">
        <h6 className="filter-subtitle">{t("filters.shipping")}</h6>
        <div className="form-check">
          <input
            type="checkbox"
            id="freeShipping"
            className="form-check-input"
            checked={freeShipping}
            onChange={(e) => onFreeShippingChange(e.target.checked)}
          />
          <label htmlFor="freeShipping" className="form-check-label">
            {t("filters.freeShipping")}
          </label>
        </div>
      </div>

      {/* Filtro por valoración */}
      <div className="filter-group mb-4">
        <h6 className="filter-subtitle">{t("filters.rating")}</h6>
        {ratings.map((rating) => (
          <div className="form-check" key={rating.value}>
            <input
              type="checkbox"
              id={`rating-${rating.value}`}
              className="form-check-input"
              checked={selectedRatings.includes(rating.value)}
              onChange={() => handleRatingChange(rating.value)}
            />
            <label
              htmlFor={`rating-${rating.value}`}
              className="form-check-label"
            >
              {rating.label}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro por unidades disponibles */}
      <div className="filter-group mb-4">
        <h6 className="filter-subtitle">{t("filters.stockQuantitiesTitle")}</h6>
        {stockQuantities.map((quantity) => (
          <div className="form-check" key={quantity.value}>
            <input
              type="checkbox"
              id={`stock-${quantity.value}`}
              className="form-check-input"
              checked={selectedStockQuantities.includes(quantity.value)}
              onChange={() => handleStockQuantityChange(quantity.value)}
            />
            <label
              htmlFor={`stock-${quantity.value}`}
              className="form-check-label"
            >
              {quantity.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
