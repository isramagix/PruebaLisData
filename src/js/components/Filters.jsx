import "../../styles/index.css";

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
  const priceRanges = [
    { label: "0-100€", value: "0-100" },
    { label: "100-300€", value: "100-300" },
    { label: "300-500€", value: "300-500" },
    { label: "500-1000€", value: "500-1000" },
    { label: "+1000€", value: "1000+" },
  ];

  const ratings = [
    { label: "1 estrella", value: 1 },
    { label: "2 estrellas", value: 2 },
    { label: "3 estrellas", value: 3 },
    { label: "4 estrellas", value: 4 },
    { label: "5 estrellas", value: 5 },
  ];

  const stockQuantities = [
    { label: "0-50 unidades", value: "0-50" },
    { label: "51-100 unidades", value: "51-100" },
    { label: "101-200 unidades", value: "101-200" },
    { label: "200+ unidades", value: "200+" },
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
      <h5 className="filters-title mb-4">Filtrar por:</h5>

      {/* Filtro por precio */}
      <div className="filter-group mb-4">
        <h6 className="filter-subtitle">Precio</h6>
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
        <h6 className="filter-subtitle">Envío</h6>
        <div className="form-check">
          <input
            type="checkbox"
            id="freeShipping"
            className="form-check-input"
            checked={freeShipping}
            onChange={(e) => onFreeShippingChange(e.target.checked)}
          />
          <label htmlFor="freeShipping" className="form-check-label">
            Envío gratuito
          </label>
        </div>
      </div>

      {/* Filtro por valoración */}
      <div className="filter-group mb-4">
        <h6 className="filter-subtitle">Valoración</h6>
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
        <h6 className="filter-subtitle">Unidades disponibles</h6>
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
