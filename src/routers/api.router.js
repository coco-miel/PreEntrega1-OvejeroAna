import { Router } from "express";
import { productRouter } from "./products.router.js"; 


export const apiRouter = Router();

apiRouter.use("/products", productRouter);
