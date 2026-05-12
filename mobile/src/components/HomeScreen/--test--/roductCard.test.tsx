import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProductCard from "../ProductCard";

const mockPush = jest.fn();
const mockAddToWishlist = jest.fn();
const mockRemoveFromWishlist = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    push: (...args: any[]) => mockPush(...args),
  },
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("../../../hooks/useWishlist", () => ({
  useWishlist: () => ({
    items: [],
    addToWishlist: mockAddToWishlist,
    removeFromWishlist: mockRemoveFromWishlist,
  }),
}));

describe("ProductCard", () => {
  const product = {
    id: "1",
    productName: "iPhone 13",
    description: "Good phone",
    price: 500,
    stock: 3,
    category: "phones",
    brand: "Apple",
    images: ["https://example.com/image.jpg"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    const { getByText } = render(<ProductCard item={product} />);

    expect(getByText("iPhone 13")).toBeTruthy();
    expect(getByText("phones")).toBeTruthy();
    expect(getByText("Apple")).toBeTruthy();
    expect(getByText("$500")).toBeTruthy();
  });

  it("navigates to product detail when card is pressed", () => {
    const { getByText } = render(<ProductCard item={product} />);

    fireEvent.press(getByText("iPhone 13"));

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("calls custom onPress if provided", () => {
    const onPress = jest.fn();

    const { getByText } = render(
      <ProductCard item={product} onPress={onPress} />
    );

    fireEvent.press(getByText("iPhone 13"));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("adds product to wishlist when heart is pressed", () => {
    const { getByTestId } = render(<ProductCard item={product} />);

    fireEvent.press(getByTestId("wishlist-button"));

    expect(mockAddToWishlist).toHaveBeenCalledTimes(1);
  });
});
