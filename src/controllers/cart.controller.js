import { cartManager } from "../services/CartManager.js";

export async function getCartsController(req, res) {
  let limit = Number(req.query.limit);
  const data = await cartManager.getCarts();
  try {
    if (!limit) {
      return res.json(data);
    }
    let limitedCarts = data.slice(0, limit);
    return res.json(limitedCarts);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export async function getCartByIdController(req, res) {
  const { cid } = req.params;
  try {
    const cartForId = await cartManager.getCartById(cid);
    return res.json({ cartForId });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export async function postAddProductToCartController(req, res) {
  const { cid, pid } = req.params;
  try {
    await cartManager.addProductToCart(cid, pid);
    return res.send(cid);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

export async function postCartController(req, res) {
  try {
    await cartManager.addCart(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

export async function deleteCartController(req, res) {
  const { id } = req.params;
  try {
    await cartManager.deleteCart(id);
    res.json(req.body);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}
