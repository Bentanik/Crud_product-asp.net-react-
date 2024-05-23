import * as services from "~/Services";

// Get all product
export const getAllProduct = async (axiosInstance) => {
  try {
    const res = await services.getAllProduct(axiosInstance);
    return res;
  } catch (err) {
    return err?.response?.data;
  }
};

// Create new a product
export const createProduct = async (axiosInstance, form) => {
  try {
    const res = await services.createProduct(axiosInstance, form);
    return res;
  } catch (err) {
    return err?.response?.data;
  }
};

// Edit product by id
export const editProductById = async (axiosInstance, form) => {
  try {
    const res = await services.editProductById(axiosInstance, form);
    return res;
  } catch (err) {
    return err?.response?.data;
  }
};

// Remove product by id
export const removeProductById = async (axiosInstance, form) => {
  try {
    const res = await services.removeProductById(axiosInstance, form);
    return res;
  } catch (err) {
    return err?.response?.data;
  }
};
