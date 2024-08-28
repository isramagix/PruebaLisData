import { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import { Filters } from "../components/Filters";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";

export const Results = () => {
  const { store, actions } = useContext(Context);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [freeShipping, setFreeShipping] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedStockQuantities, setSelectedStockQuantities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("rating");
  const itemsPerPage = 12;

  useEffect(() => {
    actions.getResult();
  }, []);

  const parsePriceRange = (range) => {
    if (range === "1000+") {
      return { min: 1000, max: Infinity };
    }

    const [min, max] = range.split("-").map(Number);
    return { min, max: max || Infinity };
  };

  const parseStockQuantityRange = (range) => {
    if (range === "200+") {
      return { min: 200, max: Infinity };
    }

    const [min, max] = range.split("-").map(Number);
    return { min, max: max || Infinity };
  };

  const filteredProducts = store.products.filter((item) => {
    const itemPrice = item.price;
    const isWithinPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const { min, max } = parsePriceRange(range);
        return itemPrice >= min && itemPrice <= max;
      });

    const hasRequiredRating =
      selectedRatings.length === 0 ||
      selectedRatings.includes(Math.floor(item.average_rating));

    const isWithinStockRange =
      selectedStockQuantities.length === 0 ||
      selectedStockQuantities.some((range) => {
        const { min, max } = parseStockQuantityRange(range);
        return item.stock_quantity >= min && item.stock_quantity <= max;
      });

    return (
      isWithinPriceRange &&
      hasRequiredRating &&
      isWithinStockRange &&
      (!freeShipping || item.is_free_shipping)
    );
  });

  // Ordenar productos
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOrder) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
      default:
        return b.average_rating - a.average_rating; // Orden por valoración descendente
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePriceRangeChange = (ranges) => {
    setSelectedPriceRanges(ranges);
  };

  const handleFreeShippingChange = (checked) => {
    setFreeShipping(checked);
  };

  const handleRatingChange = (ratings) => {
    setSelectedRatings(ratings);
  };

  const handleStockQuantityChange = (quantities) => {
    setSelectedStockQuantities(quantities);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Resultados</h1>
      <div className="row mt-5">
        <div className="col-md-3">
          <Filters
            selectedPriceRanges={selectedPriceRanges}
            freeShipping={freeShipping}
            selectedRatings={selectedRatings}
            selectedStockQuantities={selectedStockQuantities}
            onPriceRangeChange={handlePriceRangeChange}
            onFreeShippingChange={handleFreeShippingChange}
            onRatingChange={handleRatingChange}
            onStockQuantityChange={handleStockQuantityChange}
          />
        </div>

        <div className="col-md-9">
          <div className="mb-4">
            <label htmlFor="sortOrder" className="form-label">
              Ordenar por:
            </label>
            <select
              id="sortOrder"
              className="form-select"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="rating">Valoración</option>
              <option value="price-asc">Precio Ascendente</option>
              <option value="price-desc">Precio Descendente</option>
            </select>
          </div>
          <div className="row">
            {currentProducts.length === 0 ? (
              <p>No hay productos que coincidan con los filtros.</p>
            ) : (
              currentProducts.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <ProductCard product={item} />
                </div>
              ))
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </div>
      </div>
    </div>
  );
};
