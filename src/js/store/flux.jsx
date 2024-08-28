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
        const response = await fetch(`${API_BASE_URL}category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": `${API_KEY}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setStore({ categories: data });

        console.log("categories", getStore().categories);
      },

      savedSelectedCategory: (category) => {
        setStore({ selectCategory: category });
      },

      getSubCategories: async () => {
        const store = getStore();
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
        const data = await response.json();
        console.log(data);
        setStore({ subcategories: data });

        console.log("subcategories", getStore().subcategories);
      },

      savedSelectedSubcategory: (subcategory) => {
        setStore({ selectSubcategory: subcategory });
      },

      getColors: async () => {
        const store = getStore();
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
        const data = await response.json();
        console.log(data);
        setStore({ colors: data });

        console.log("colors", getStore().colors);
      },

      savedSelectedColor: (color) => {
        setStore({ selectColor: color });
      },

      doQueryConsult: () => {
        const store = getStore();
        query = {
          id_category: store.selectCategory,
          id_subcategory: store.selectSubcategory,
          id_color: store.selectColor,
        };
        queryString = new URLSearchParams(query).toString();
        setStore({ querySearch: queryString });
      },

      getResult: async () => {},
    },
  };
};

export default getState;
