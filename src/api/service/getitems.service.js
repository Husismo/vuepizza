export default (api) => {
  api.getItems = {
    getItems(payload) {
      return api.instance.get(`/items`, payload);
    },
  };
};
