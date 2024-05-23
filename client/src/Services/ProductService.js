export const getAllProduct = (axiosInstance) => {
  return axiosInstance.get("/api/Product/getallproduct");
};

export const createProduct = (axiosInstance, form) => {
  return axiosInstance.post("/api/Product/createproduct", form);
};

export const editProductById = (axiosInstance, form) => {
  const { id, ...rest } = form;
  return axiosInstance.put(`/api/Product/editproduct/${id}`, rest);
};

export const removeProductById = (axiosInstance, form) => {
  return axiosInstance.delete(`/api/Product/removeproductbyid/${form?.id}`);
};
