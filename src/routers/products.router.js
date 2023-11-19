import {
  getProductController,
  getProductControllerId,
  postProductController,
  putProductController,
  deleteProductController,
} from "../controllers/product.controller.js";
import { Router } from "express";

export const productRouter = Router();

productRouter.get("/", getProductController);
productRouter.get("/:id", getProductControllerId);
productRouter.post("/", postProductController);
productRouter.put("/:id", putProductController);
productRouter.delete("/:id", deleteProductController);
