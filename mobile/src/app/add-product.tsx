import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import AddProductHeader from "../components/add-product/AddProductHeader";
import Stepper from "../components/add-product/Stepper";
import SectionCard from "../components/add-product/SectionCard";
import FormInput from "../components/add-product/FormInput";
import ImagePickerBox from "../components/add-product/ImagePickerBox";
import AddProductFooter from "../components/add-product/AddProductFooter";
import { ADD_PRODUCT_COLORS } from "../constants/addProduct";
import useAddProduct from "../hooks/useAddProduct";

export default function AddProductScreen() {
  const {
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
  } = useAddProduct();

  const handleNext = () => {
    if (currentStep === 1 || currentStep === 2) {
      nextStep();
    }
  };

  const handleSubmit = () => {
    const isValid = validate();

    if (!isValid) {
      Alert.alert("Validation Error", "Please fill all required fields correctly.");
      return;
    }

    Alert.alert("Success", "Product added successfully");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AddProductHeader />
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
          <SectionCard title="Basic Information">
            <FormInput
              label="Product Name"
              value={formData.productName}
              placeholder="Enter product name"
              error={errors.productName}
              onChangeText={(value) => updateField("productName", value)}
            />

            <FormInput
              label="Description"
              value={formData.description}
              placeholder="Enter product description"
              multiline
              error={errors.description}
              onChangeText={(value) => updateField("description", value)}
            />
          </SectionCard>
        )}

        {currentStep === 2 && (
          <SectionCard title="Product Details">
            <FormInput
              label="Price"
              value={formData.price}
              placeholder="Enter price"
              keyboardType="numeric"
              error={errors.price}
              onChangeText={(value) => updateField("price", value)}
            />

            <FormInput
              label="Stock"
              value={formData.stock}
              placeholder="Enter stock quantity"
              keyboardType="numeric"
              error={errors.stock}
              onChangeText={(value) => updateField("stock", value)}
            />

            <FormInput
              label="Category"
              value={formData.category}
              placeholder="Enter category"
              error={errors.category}
              onChangeText={(value) => updateField("category", value)}
            />

            <FormInput
              label="Brand"
              value={formData.brand}
              placeholder="Enter brand"
              error={errors.brand}
              onChangeText={(value) => updateField("brand", value)}
            />
          </SectionCard>
        )}

        {currentStep === 3 && (
          <SectionCard title="Product Images">
            <ImagePickerBox
              images={images}
              onAddImage={addMockImage}
              onRemoveImage={removeImage}
            />
          </SectionCard>
        )}

        <AddProductFooter
          currentStep={currentStep}
          onBack={prevStep}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ADD_PRODUCT_COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: ADD_PRODUCT_COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
});