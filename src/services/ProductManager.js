import fs from "fs/promises";
import { Product } from "../models/Product.js";
import crypto from "crypto";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }) {
    const products = await this.getProducts();
    const productToAdd = products.find((product) => product.code === code);

    if (productToAdd) {
      throw new Error(`El producto con el código ${code} ya existe.`);
    }

    const id = crypto.randomUUID();
    const newProduct = new Product({
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    products.push(newProduct);
    await this.saveProductsToFile(products);

    return newProduct;
  }

  async saveProductsToFile(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error);
    }
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data) || [];
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const productToFind = products.find((p) => p.id === id);
    if (!productToFind) {
      throw new Error(`El producto con id ${id} no se encuentra o no existe`);
    }
    return productToFind;
  }

  async updateProduct(id, newData) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((i) => i.id === id);
    if (productIndex !== -1) {
      const product = products[productIndex];
      try {
        products[productIndex] = { ...product, ...newData };
        await fs.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
      } catch (error) {
        throw new Error(
          `Error al actualizar el producto, faltan campos a rellenar: ${error}`
        );
      }
      return;
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((i) => i.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf8");
      return products;
    }
    throw new Error(`El producto con id ${id} no se encuentra o no existe`);
  }
}

export const productManager = new ProductManager("./db/productos.json");
