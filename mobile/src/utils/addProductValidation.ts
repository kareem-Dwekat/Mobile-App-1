import { ProductFormData, ProductFormErrors } from "../types/addProduct";

export function validateAddProductForm(
  formData: ProductFormData
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (!formData.productName.trim()) {
    errors.productName = "Product name is required";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.price.trim()) {
    errors.price = "Price is required";
  } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
    errors.price = "Enter a valid price";
  }

  if (!formData.stock.trim()) {
    errors.stock = "Stock is required";
  } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
    errors.stock = "Enter a valid stock";
  }

  if (!formData.category.trim()) {
    errors.category = "Category is required";
  }

  if (!formData.brand.trim()) {
    errors.brand = "Brand is required";
  }

  return errors;
}