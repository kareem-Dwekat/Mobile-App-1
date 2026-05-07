/**
 * Seed script using Firebase REST API directly
 * لا يحتاج firebase-admin، يعمل مع Rules مفتوحة فقط
 */

const PROJECT_ID = "mobileapp-6cffc";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const testProducts = [
  {
    productName: "iPhone 15 Pro Max",
    description: "The latest iPhone 15 Pro Max with a titanium design, A17 Pro chip, and a more advanced 48MP Main camera system.",
    price: 1199.99,
    stock: 15,
    category: "Electronics",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80"]
  },
  {
    productName: "Samsung Galaxy S25 Ultra",
    description: "Experience the ultimate smartphone with the Samsung Galaxy S25 Ultra featuring a stunning display and advanced camera capabilities.",
    price: 999.99,
    stock: 20,
    category: "Electronics",
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"]
  }
];

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

  return res.json();
}

async function main() {
  try {
    console.log("🔥 Adding test products to Firebase via REST API...\n");

    for (const product of testProducts) {
      console.log(`📦 Adding ${product.productName}...`);
      const result = await addProduct(product);
      console.log(`✅ Added! ID: ${result.name.split("/").pop()}\n`);
    }

    console.log("🎉 Done! Products added to the store.");
    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e.message);
    process.exit(1);
  }
}

main();
