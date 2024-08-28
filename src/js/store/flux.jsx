const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      categories: [],
      selectCategory: "",
      subcategories: [],
      selectSubcategory: "",
      colors: [],
      selectColor: "",
      products: [],
      querySearch: "",
    },
    actions: {
      resetStore: () => {
        setStore({
          categories: [],
          selectCategory: "",
          subcategories: [],
          selectSubcategory: "",
          colors: [],
          selectColor: "",
          products: [],
        });
      },

      getCategories: async () => {
        const store = getStore();
        try {
          const response = await fetch(`${API_BASE_URL}category`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": `${API_KEY}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching categories");
          }
          const data = await response.json();
          console.log(data);
          setStore({ categories: data });
          console.log("categories", store.categories);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      },

      savedSelectedCategory: (category) => {
        setStore({ selectCategory: category });
      },

      getSubCategories: async () => {
        const store = getStore();
        try {
          const response = await fetch(
            `${API_BASE_URL}category/${store.selectCategory}/subcategory`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": `${API_KEY}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching subcategories");
          }
          const data = await response.json();
          console.log(data);
          setStore({ subcategories: data });
          console.log("subcategories", getStore().subcategories);
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
        }
      },

      savedSelectedSubcategory: (subcategory) => {
        setStore({ selectSubcategory: subcategory });
      },

      getColors: async () => {
        const store = getStore();
        try {
          const response = await fetch(
            `${API_BASE_URL}subcategory/${store.selectSubcategory}/color`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": `${API_KEY}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching colors");
          }
          const data = await response.json();
          console.log(data);
          setStore({ colors: data });
          console.log("colors", getStore().colors);
        } catch (error) {
          console.error("Failed to fetch colors:", error);
        }
      },

      savedSelectedColor: (color) => {
        setStore({ selectColor: color });
      },

      doQueryConsult: () => {
        const store = getStore();
        const query = {
          id_category: store.selectCategory,
          id_subcategory: store.selectSubcategory,
          id_color: store.selectColor,
        };
        const queryString = new URLSearchParams(query).toString();
        setStore({ querySearch: queryString });
      },

      getResult: async () => {
        const store = getStore();
        const actions = getActions();
        try {
          actions.doQueryConsult();
          const query = store.querySearch;

          const response = await fetch(`${API_BASE_URL}product?${query}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": `${API_KEY}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching products");
          }
          const data = await response.json();
          console.log(data);
          setStore({ products: data });
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
    },
  };
};

export default getState;
