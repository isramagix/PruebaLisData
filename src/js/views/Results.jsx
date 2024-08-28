import { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";

export const Results = () => {
  const { store, actions } = useContext(Context);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de productos por página

  useEffect(() => {
    actions.getResult();
  }, [actions]);

  // Filtrar productos basados en los filtros aplicados
  const filteredProducts = store.products.filter((item) => {
    const itemPrice = item.price;
    const isWithinPriceRange =
      itemPrice >= (minPrice === "" ? 0 : Number(minPrice)) &&
      (maxPrice === "" || itemPrice <= Number(maxPrice)); // Maneja el caso de maxPrice vacío

    return isWithinPriceRange && (!freeShipping || item.is_free_shipping);
  });

  // Paginación: Calcular los productos a mostrar en la página actual
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Maneja cambios en el input y asegura que solo se introduzcan números
  const handlePriceChange = (e, setter) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Expresión regular para permitir solo números y puntos
      setter(value);
    }
  };

  // Cambiar página y desplazarse hacia arriba
  const changePage = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazarse hacia arriba con animación suave
  };

  return (
    <div className="container-fluid text-center">
      <h1 className="mt-5">Resultados</h1>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="minPrice" className="form-label">
            Precio Mínimo
          </label>
          <input
            type="text"
            id="minPrice"
            className="form-control"
            value={minPrice}
            onChange={(e) => handlePriceChange(e, setMinPrice)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="maxPrice" className="form-label">
            Precio Máximo
          </label>
          <input
            type="text"
            id="maxPrice"
            className="form-control"
            value={maxPrice}
            onChange={(e) => handlePriceChange(e, setMaxPrice)}
          />
        </div>
        <div className="col-md-4">
          <div className="form-check">
            <input
              type="checkbox"
              id="freeShipping"
              className="form-check-input"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
            />
            <label htmlFor="freeShipping" className="form-check-label">
              Envío gratuito
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {currentProducts.length === 0 ? (
            <p>No hay productos que coincidan con los filtros.</p>
          ) : (
            currentProducts.map((item) => (
              <div
                key={item.id}
                className="card mb-3 mx-auto"
                style={{ maxWidth: "540px" }}
              >
                <img
                  src="https://via.placeholder.com/540x300"
                  className="card-img-top"
                  alt={item.name}
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    <strong>Quedan:</strong> {item.stock_quantity} unidades
                  </p>
                  <p className="card-text">
                    <strong>Envío gratuito:</strong>{" "}
                    {item.is_free_shipping ? "Sí" : "No"}
                  </p>
                  <p className="card-text">
                    <strong>Precio:</strong> {item.price} €
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Controles de Paginación */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => changePage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
