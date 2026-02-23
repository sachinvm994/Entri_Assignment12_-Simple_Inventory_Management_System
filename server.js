import express from "express";
import ProductRouter from "./routes/inventoryRoutes.js"

const app = express();
app.use(express.json());
const port = 3000;

app.use("/products",ProductRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}/products`);
});