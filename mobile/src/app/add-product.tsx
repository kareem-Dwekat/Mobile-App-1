import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import AddProductHeader from "../components/add-product/AddProductHeader";
import Stepper from "../components/add-product/Stepper";
import SectionCard from "../components/add-product/SectionCard";
import FormInput from "../components/add-product/FormInput";
import FormSelect from "../components/add-product/FormSelect";
import ImagePickerBox from "../components/add-product/ImagePickerBox";
import AddProductFooter from "../components/add-product/AddProductFooter";

import {
  ADD_PRODUCT_COLORS,
  ADD_PRODUCT_CATEGORIES,
} from "../constants/addProduct";
import useAddProduct from "../hooks/useAddProduct";
import { saveProductToFirestore } from "../services/product.service";

export default function AddProductScreen() {
  const {
    currentStep,
    formData,
    errors,
    images,
    updateField,
    addImage,
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

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to your photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        addImage(imageUri);
      }
    } catch (error) {
      console.log("Image pick error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSubmit = async () => {
    const isValid = validate();

    if (!isValid) {
      Alert.alert(
        "Validation Error",
        "Please fill all required fields correctly."
      );
      return;
    }

    try {
      await saveProductToFirestore({
        formData,
        images,
      });

      Alert.alert("Success", "Product added successfully", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]);
    } catch (error) {
      console.log("Save product error:", error);
      Alert.alert("Error", "Failed to save product");
    }
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

            <FormSelect
              label="Category"
              value={formData.category}
              options={ADD_PRODUCT_CATEGORIES}
              error={errors.category}
              onValueChange={(value) => updateField("category", value)}
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
              onAddImage={handlePickImage}
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