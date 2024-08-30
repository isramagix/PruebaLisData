import { useTranslation } from "react-i18next";

export const DropDownFilter = ({ sortOrder, onSortChange }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label htmlFor="sortOrder" className="form-label">
        {t("results.sortBy")}
      </label>
      <select
        id="sortOrder"
        className="form-select"
        value={sortOrder}
        onChange={onSortChange}
      >
        <option value="rating">{t("results.sort.rating")}</option>
        <option value="price-asc">{t("results.sort.priceAsc")}</option>
        <option value="price-desc">{t("results.sort.priceDesc")}</option>
      </select>
    </div>
  );
};
