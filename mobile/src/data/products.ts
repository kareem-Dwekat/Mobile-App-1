export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

const categories = [
  "Men",
  "Women",
  "Kids",
  "Shoes",
  "Electronics",
  "Bags",
  "Sports",
  "Seasonal",
  "Perfumes",
  "Accessories",
  "Watches",
  "Glasses",
  "Furniture",
  "Cosmetics",
  "Mobiles",
  "Laptops",
  "Games",
  "Home Appliances",
];

const productNames = [
  "Pro",
  "Max",
  "Air",
  "Ultra",
  "Smart",
  "Classic",
  "Premium",
  "Elite",
];

const generateProducts = () => {
  const products: Product[] = [];
  let id = 1;

  categories.forEach((category) => {
    for (let i = 1; i <= 350; i++) {
      const randomName =
        productNames[Math.floor(Math.random() * productNames.length)];

      products.push({
        id: id++,
        title: `${category} ${randomName} ${i}`,
        price: Math.floor(Math.random() * 500) + 20,
        category,
        image: `https://picsum.photos/300/300?random=${id}`,
      });
    }
  });

  return products;
};

export const products = generateProducts();