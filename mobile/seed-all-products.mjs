const PROJECT_ID = "mobileapp-6cffc";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const categories = ["clothes", "Electronics", "Shoes", "Beauty", "Home", "Sports"];

const productsData = {
  "clothes": [
    { productName: "Men's Casual T-Shirt", description: "Comfortable cotton t-shirt for daily wear.", price: 19.99, stock: 50, brand: "Nike", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"] },
    { productName: "Women's Summer Dress", description: "Lightweight and breathable floral dress.", price: 39.99, stock: 30, brand: "Zara", images: ["https://images.unsplash.com/photo-1515347619362-75fbcdfb142a?w=500&q=80"] },
    { productName: "Classic Denim Jacket", description: "Vintage style denim jacket for any occasion.", price: 59.99, stock: 20, brand: "Levi's", images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80"] },
    { productName: "Athletic Hoodie", description: "Warm and cozy hoodie for workouts or lounging.", price: 45.00, stock: 40, brand: "Adidas", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80"] },
    { productName: "Formal Office Shirt", description: "Crisp white button-down shirt for professionals.", price: 34.99, stock: 25, brand: "H&M", images: ["https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500&q=80"] },
    { productName: "Winter Puffer Coat", description: "Insulated coat to keep you warm in freezing weather.", price: 89.99, stock: 15, brand: "North Face", images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80"] }
  ],
  "Electronics": [
    { productName: "Wireless Noise Cancelling Headphones", description: "Premium headphones with active noise cancellation.", price: 299.99, stock: 45, brand: "Sony", images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80"] },
    { productName: "4K Smart TV 55-inch", description: "Ultra HD smart TV with vibrant colors.", price: 499.99, stock: 10, brand: "Samsung", images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80"] },
    { productName: "Gaming Laptop Pro", description: "High-performance laptop for gamers and creators.", price: 1299.00, stock: 8, brand: "Asus", images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80"] },
    { productName: "Smartphone X", description: "Latest smartphone with incredible camera and battery life.", price: 899.00, stock: 20, brand: "Apple", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"] },
    { productName: "Bluetooth Portable Speaker", description: "Waterproof speaker with deep bass.", price: 59.99, stock: 35, brand: "JBL", images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"] },
    { productName: "Smartwatch Series 5", description: "Track your health and stay connected on the go.", price: 199.99, stock: 25, brand: "Garmin", images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80"] }
  ],
  "Shoes": [
    { productName: "Running Sneakers", description: "Lightweight and comfortable running shoes.", price: 79.99, stock: 30, brand: "Nike", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"] },
    { productName: "Leather Formal Shoes", description: "Elegant Oxford shoes for business or formal events.", price: 110.00, stock: 15, brand: "Clarks", images: ["https://images.unsplash.com/photo-1614252339476-53115c90004f?w=500&q=80"] },
    { productName: "Casual Canvas Sneakers", description: "Classic everyday sneakers.", price: 45.00, stock: 40, brand: "Converse", images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80"] },
    { productName: "High-Heel Pumps", description: "Stylish pumps for a night out.", price: 65.00, stock: 20, brand: "Steve Madden", images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80"] },
    { productName: "Winter Hiking Boots", description: "Durable and waterproof boots for harsh terrains.", price: 130.00, stock: 12, brand: "Timberland", images: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80"] },
    { productName: "Summer Slip-on Sandals", description: "Easy-to-wear sandals for the beach or pool.", price: 25.00, stock: 50, brand: "Crocs", images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80"] }
  ],
  "Beauty": [
    { productName: "Hydrating Face Serum", description: "Glow-boosting serum with hyaluronic acid.", price: 34.00, stock: 40, brand: "The Ordinary", images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"] },
    { productName: "Matte Lipstick Set", description: "Long-lasting lip colors in 3 shades.", price: 24.99, stock: 25, brand: "MAC", images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80"] },
    { productName: "Organic Body Lotion", description: "Nourishing body lotion with shea butter.", price: 18.50, stock: 35, brand: "CeraVe", images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80"] },
    { productName: "Volumizing Mascara", description: "Waterproof mascara for fuller lashes.", price: 15.00, stock: 50, brand: "Maybelline", images: ["https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=500&q=80"] },
    { productName: "Luxury Perfume", description: "Floral and woody fragrance.", price: 85.00, stock: 10, brand: "Chanel", images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80"] },
    { productName: "Charcoal Face Mask", description: "Deep cleansing mask for clearer skin.", price: 20.00, stock: 30, brand: "L'Oréal", images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80"] }
  ],
  "Home": [
    { productName: "Cozy Throw Blanket", description: "Soft fleece blanket for your sofa.", price: 29.99, stock: 25, brand: "IKEA", images: ["https://images.unsplash.com/photo-1580301762083-ce065b9a4c16?w=500&q=80"] },
    { productName: "Ceramic Coffee Mug Set", description: "Set of 4 elegant coffee mugs.", price: 22.00, stock: 15, brand: "HomeGoods", images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80"] },
    { productName: "Aromatherapy Diffuser", description: "Essential oil diffuser with LED lights.", price: 35.00, stock: 20, brand: "Muji", images: ["https://images.unsplash.com/photo-1608528577386-b484ba3ecf02?w=500&q=80"] },
    { productName: "Table Lamp", description: "Modern minimalist desk lamp.", price: 45.00, stock: 12, brand: "Target", images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"] },
    { productName: "Cotton Bed Sheets", description: "Queen size 400-thread count sheets.", price: 55.00, stock: 18, brand: "Brooklinen", images: ["https://images.unsplash.com/photo-1522771731535-6afffb2b4672?w=500&q=80"] },
    { productName: "Wall Art Set", description: "Set of 3 abstract canvas prints.", price: 75.00, stock: 10, brand: "West Elm", images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"] }
  ],
  "Sports": [
    { productName: "Yoga Mat", description: "Non-slip exercise mat with carrying strap.", price: 25.00, stock: 40, brand: "Lululemon", images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80"] },
    { productName: "Adjustable Dumbbell Set", description: "Space-saving dumbbells up to 50 lbs.", price: 150.00, stock: 5, brand: "Bowflex", images: ["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80"] },
    { productName: "Tennis Racket", description: "Professional grade tennis racket.", price: 120.00, stock: 12, brand: "Wilson", images: ["https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&q=80"] },
    { productName: "Cycling Helmet", description: "Aerodynamic and lightweight helmet.", price: 65.00, stock: 20, brand: "Giro", images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80"] },
    { productName: "Jump Rope", description: "Speed jump rope for cardio.", price: 12.99, stock: 50, brand: "Rogue", images: ["https://images.unsplash.com/photo-1598285526017-f58c7349b1ff?w=500&q=80"] },
    { productName: "Resistance Bands Set", description: "Set of 5 bands for strength training.", price: 19.99, stock: 35, brand: "Fit Simplify", images: ["https://images.unsplash.com/photo-1598266663439-2056e6900339?w=500&q=80"] }
  ]
};

function toFirestoreDocument(product) {
  return {
    fields: {
      productName: { stringValue: product.productName },
      description: { stringValue: product.description },
      price: { doubleValue: product.price },
      stock: { integerValue: product.stock },
      category: { stringValue: product.category },
      brand: { stringValue: product.brand },
      images: {
        arrayValue: {
          values: product.images.map(img => ({ stringValue: img }))
        }
      },
      createdAt: { timestampValue: new Date().toISOString() }
    }
  };
}

async function fetchAllProducts() {
  const url = `${BASE_URL}/products`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.documents || [];
}

async function deleteProduct(name) {
  const url = `https://firestore.googleapis.com/v1/${name}`;
  await fetch(url, { method: "DELETE" });
}

async function addProduct(product) {
  const url = `${BASE_URL}/products`;
  const body = toFirestoreDocument(product);
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(err.error || err)}`);
  }
}

async function main() {
  try {
    console.log("🔥 Connecting to Firebase via REST API...\n");

    // 1. Delete all existing products
    console.log("🗑️  Fetching existing products to delete...");
    const existingProducts = await fetchAllProducts();
    for (const doc of existingProducts) {
      await deleteProduct(doc.name);
    }
    console.log(`✅ Deleted ${existingProducts.length} old products.\n`);

    // 2. Add new products
    let count = 0;
    for (const category of categories) {
      console.log(`📦 Adding products for category: ${category}...`);
      const products = productsData[category];
      for (const product of products) {
        // Adding the category from our loop just to be sure it matches exactly
        product.category = category;
        await addProduct(product);
        count++;
      }
    }

    console.log(`\n🎉 Done! Added ${count} new products successfully.`);
    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e.message);
    process.exit(1);
  }
}

main();
