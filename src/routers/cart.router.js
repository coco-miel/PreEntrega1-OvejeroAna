import {
  getCartByIdController,
  postCartController,
  postAddProductToCartController,
  getCartsController,
  deleteCartController,
} from "../controllers/cart.controller.js";
import { Router } from "express";

export const cartRouter = Router();

cartRouter.get("/:cid", getCartByIdController);
cartRouter.get("/", getCartsController);
cartRouter.post("/", postCartController);
cartRouter.post("/:cid/product/:pid", postAddProductToCartController);
cartRouter.delete("/:cid", deleteCartController);
