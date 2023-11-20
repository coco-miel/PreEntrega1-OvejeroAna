export class Product {
  constructor({
    id,
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  }) {
    this.id = notNull(id);
    this.title = notNull(title);
    this.description = notNull(description);
    this.code = notNull(code);
    this.price = notNegative(price);
    this.status = notNull(Boolean(status));
    this.stock = notNegative(stock);
    this.category = notNull(category);
    this.thumbnails = formatThumbnails(thumbnails);
  }
}

export function notNull(data) {
  if (data === null || data === undefined) {
    throw new Error("Ingresaste datos invalidos");
  }
  return data;
}

export function notNegative(value) {
  const numericValue = notNull(Number(value));
  if (numericValue < 0) {
    throw new Error("No puede ser menor a 0");
  }
  return numericValue;
}

export function formatThumbnails(thumbnails) {
  if (!Array.isArray(thumbnails)) {
    throw new Error("Thumbnails solo puede ser un array");
  }
  return thumbnails.flat();
}
