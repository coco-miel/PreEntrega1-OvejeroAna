import express, { Router } from "express";
import { apiRouter } from "./routers/api.router.js";
const app = express();

app.use(express.json());
app.use("/api", apiRouter);


app.use((err, res,) => {
  console.error(err.stack);
  res.status(500).send("Hubo un error");
});

app.listen(8080, () => console.log("Ingresa en http://localhost:8080/api/products \n o en http://localhost:8080/api/carts"));
