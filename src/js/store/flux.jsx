const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      categories: [],
      subcategories: [],
      colors: [],
      products: [],
    },
    actions: {},
  };
};

export default getState;
