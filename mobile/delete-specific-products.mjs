const PROJECT_ID = "mobileapp-6cffc";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const productsToDelete = [
  "Jump Rope",
  "Tennis Racket",
  "Cotton Bed Sheets",
  "Aromatherapy Diffuser",
  "Cozy Throw Blanket",
  "Leather Formal Shoes",
  "Formal Office Shirt",
  "Women's Summer Dress"
];

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

async function main() {
  try {
    console.log("🔥 Connecting to Firebase via REST API...\n");

    console.log("🗑️  Fetching existing products...");
    const existingProducts = await fetchAllProducts();
    
    let deletedCount = 0;

    for (const doc of existingProducts) {
      const productName = doc.fields?.productName?.stringValue;
      
      if (productName && productsToDelete.includes(productName)) {
        console.log(`❌ Deleting product: ${productName}...`);
        await deleteProduct(doc.name);
        deletedCount++;
      }
    }

    console.log(`\n✅ Done! Deleted ${deletedCount} products successfully.`);
    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e.message);
    process.exit(1);
  }
}

main();
