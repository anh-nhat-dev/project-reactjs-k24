import Http from "./Http";

export const getProducts = (config) => {
  return Http.get("/products", config);
};

export const getProduct = (id, config) => {
  return Http.get(`/products/${id}`, config);
};

export const getCommentsProduct = (id, config) => {
  return Http.get(`/products/${id}/comments`, config);
};

export const createCommentProduct = (id, data, config) => {
  return Http.post(`/products/${id}/comments`, data, config);
};
