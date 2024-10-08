import { useTranslation } from "react-i18next"; // Importar el hook de traducción

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation(); // Inicializar el hook de traducción

  return (
    <nav id="paginator" aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {t("pagination.previous")} {/* Utilizar la traducción */}
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {t("pagination.next")} {/* Utilizar la traducción */}
          </button>
        </li>
      </ul>
    </nav>
  );
};
