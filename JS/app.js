import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();

app.use(express.json());

const pm = new ProductManager("./db/products.json");
app.get("/products", async (req, res) => {
  let limit = req.query.limit;
  const data = await pm.getProducts();
  if (!limit) {
    return res.json(data);
  }
  let limitedProducts = data.slice(0, limit);
  return res.json(limitedProducts);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productForId = await pm.getProductById(id);
    return res.json({ productForId });
  } catch (error) {
    res.json({ message: error.message });
  }
});
app.listen(8080, () => console.log("servidor levantado en el puerto 8080"));