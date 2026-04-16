import { useState } from "react";
import {
  ProductFormData,
  ProductFormErrors,
} from "../types/addProduct";

const initialFormData: ProductFormData = {
  productName: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  brand: "",
};

export default function useAddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [images, setImages] = useState<string[]>([]);

  const updateField = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const addImage = (imageUri: string) => {
    setImages((prev) => [...prev, imageUri]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setErrors({});
    setImages([]);
  };

  const validate = () => {
    const newErrors: ProductFormErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Stock is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    currentStep,
    formData,
    errors,
    images,
    updateField,
    addImage,
    removeImage,
    nextStep,
    prevStep,
    resetForm,
    validate,
  };
}