import { productManager } from "../services/ProductManager.js";

export async function getProductController(req, res) {
  let limit = Number(req.query.limit);
  try {
    const data = await productManager.getProducts();
    if (!limit) {
      return res.json(data);
    }
    let limitedProducts = data.slice(0, limit);
    return res.json(limitedProducts);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export async function getProductControllerId(req, res) {
  const id = req.params.id;
  try {
    const productForId = await productManager.getProductById(id);
    return res.json(productForId);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export async function postProductController(req, res) {
  try {
    await productManager.addProduct(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(422).send({ message: error.message });
  }
}

export async function putProductController(req, res) {
  const { id } = req.params;
  try {
    await productManager.updateProduct(id, req.body);
    res.json(id);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export async function deleteProductController(req, res) {
  const { id } = req.params;
  try {
    await productManager.deleteProduct(id);
    res.json(req.body);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}
