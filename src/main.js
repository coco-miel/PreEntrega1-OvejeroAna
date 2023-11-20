import express from "express";
import { apiRouter } from "./routers/api.router.js";
const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Hubo un error en el servidor");
});

app.listen(8080, () =>
  console.log(
    "Ingresa en http://localhost:8080/api/products \n o en http://localhost:8080/api/carts"
  )
);


