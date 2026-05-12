import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { saveProductToFirestore } from "../services/product.service";

type AddProductFormData = {
  productName: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  brand: string;
  images: string[];
};

export default function AddProductScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, watch, trigger } =
    useForm<AddProductFormData>({
      defaultValues: {
        productName: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        images: [],
      },
    });

  const images = watch("images");

  const addProductMutation = useMutation({
    mutationFn: saveProductToFirestore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      Alert.alert("Success", "Product added successfully", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]);
    },
    onError: (error) => {
      console.log("Save product error:", error);
      Alert.alert("Error", "Failed to save product");
    },
  });

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger(["productName", "description"]);
    }

    if (currentStep === 2) {
      isValid = await trigger(["price", "stock", "category", "brand"]);
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill all required fields correctly."
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required", "Please allow access to your photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;

        setValue("images", [...images, imageUri], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log("Image pick error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: AddProductFormData) => {
    addProductMutation.mutate({
      formData: {
        productName: data.productName,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        brand: data.brand,
      },
      images: data.images,
    });
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
            <Controller
              control={control}
              name="productName"
              rules={{ required: "Product name is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormInput
                  label="Product Name"
                  value={value}
                  placeholder="Enter product name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormInput
                  label="Description"
                  value={value}
                  placeholder="Enter product description"
                  multiline
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />
          </SectionCard>
        )}

        {currentStep === 2 && (
          <SectionCard title="Product Details">
            <Controller
              control={control}
              name="price"
              rules={{
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Price must be a number",
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormInput
                  label="Price"
                  value={value}
                  placeholder="Enter price"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="stock"
              rules={{
                required: "Stock is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Stock must be a number",
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormInput
                  label="Stock"
                  value={value}
                  placeholder="Enter stock quantity"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormSelect
                  label="Category"
                  value={value}
                  options={ADD_PRODUCT_CATEGORIES}
                  onValueChange={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="brand"
              rules={{ required: "Brand is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormInput
                  label="Brand"
                  value={value}
                  placeholder="Enter brand"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />
          </SectionCard>
        )}

        {currentStep === 3 && (
          <SectionCard title="Product Images">
            <Controller
              control={control}
              name="images"
              rules={{
                validate: (value) =>
                  value.length > 0 || "Please add at least one product image",
              }}
              render={({ field: { value }, fieldState: { error } }) => (
                <ImagePickerBox
                  images={value}
                  error={error?.message}
                  onAddImage={handlePickImage}
                  onRemoveImage={removeImage}
                />
              )}
            />
          </SectionCard>
        )}

        <AddProductFooter
          currentStep={currentStep}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit(onSubmit)}
         
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