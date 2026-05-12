import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("products.db");

export type OfflineProductItem = {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  createdAt?: any;
};

export const initProductsDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      productName TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL,
      category TEXT,
      brand TEXT,
      images TEXT
    );
  `);
};

export const saveProductsToSQLite = (products: OfflineProductItem[]) => {
  initProductsDatabase();

  products.forEach((item) => {
    db.runSync(
      `
      INSERT OR REPLACE INTO products
      (id, productName, description, price, stock, category, brand, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        item.id,
        item.productName,
        item.description ?? "",
        Number(item.price) || 0,
        Number(item.stock) || 0,
        item.category ?? "",
        item.brand ?? "",
        JSON.stringify(item.images ?? []),
      ]
    );
  });
};

export const getProductsFromSQLite = (): OfflineProductItem[] => {
  initProductsDatabase();

  const rows = db.getAllSync<any>("SELECT * FROM products");

  return rows.map((item) => ({
    id: item.id,
    productName: item.productName,
    description: item.description,
    price: Number(item.price),
    stock: Number(item.stock),
    category: item.category,
    brand: item.brand,
    images: item.images ? JSON.parse(item.images) : [],
  }));
};