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
        const response = await fetch(
          "https://technicalproof.lisdatasolutions.com/api/v1/recommender/category",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "976fea5c-31ae-46f5-a670-54bbe426861a",
            },
          }
        );
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
          `https://technicalproof.lisdatasolutions.com/api/v1/recommender/category/${store.selectCategory}/subcategory`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "976fea5c-31ae-46f5-a670-54bbe426861a",
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
          `https://technicalproof.lisdatasolutions.com/api/v1/recommender/subcategory/${store.selectSubcategory}/color`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "976fea5c-31ae-46f5-a670-54bbe426861a",
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
    },
  };
};

export default getState;
