import crypto from "crypto";

export class Product {
  constructor({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  }) {
    this.id = this.generateId();
    this.title = this.notNull(title);
    this.description = this.notNull(description);
    this.code = this.notNull(code);
    this.price = this.notNull(price);
    this.status = this.notNull(status);
    this.stock = this.notNull(stock);
    this.category = this.notNull(category);
    this.thumbnails = thumbnails || [];
  }

  generateId() {
    return crypto.randomUUID();
  }

  notNull(data) {
    if (data === null || data === undefined) {
      throw new Error("Ingresaste datos invalidos");
    }
    return data;
  }
}
