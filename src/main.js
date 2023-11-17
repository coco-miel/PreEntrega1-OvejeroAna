import {Router} from "express";
import express from "express";
import { ProductManager } from "./services/ProductManager.js";

export const productRouter = Router()

const app = express();


app.use(express.json());
const pm = new ProductManager("./db/productos.json");

app.get("/api/products", async (req, res) => {
  let limit = req.query.limit;
  const data = await pm.getProducts();
  if (!limit) {
    return res.json(data);
  }
  let limitedProducts = data.slice(0, limit);
  return res.json(limitedProducts);
});

app.get("/api/productos/:pid", async (req, res) => {
  const id = req.params.pid;
  try {
    const productForId = await pm.getProductById(id);
    return res.json(productForId);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  try {
    const newProduct = await pm.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });

    res.status(201).json(newProduct); 
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al añadir producto" });
  }
});

app.listen(8080, () => console.log("http://localhost:8080/api/products"));