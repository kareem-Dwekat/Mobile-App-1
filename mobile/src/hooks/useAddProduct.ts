import { useState } from "react";
import { ProductFormData, ProductFormErrors } from "../types/addProduct";
import { validateAddProductForm } from "../utils/addProductValidation";

export default function useAddProduct() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });

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

  const addMockImage = () => {
    setImages((prev) => [...prev, `image-${prev.length + 1}`]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const validate = () => {
    const validationErrors = validateAddProductForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    currentStep,
    formData,
    errors,
    images,
    updateField,
    addMockImage,
    removeImage,
    nextStep,
    prevStep,
    validate,
  };
}