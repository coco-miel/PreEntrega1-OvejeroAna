export class Product {
    constructor({ id, title, description, price, thumbnail, code, stock }) {
      this.id = notNull(id);
      this.title = notNull(title);
      this.description = notNull(description);
      this.price = notNull(price);
      this.thumbnail = notNull(thumbnail);
      this.code = notNull(code);
      this.stock = notNull(stock);
    }
  }
  
  export function notNull(valor) {
    if (valor === null || valor === undefined) {
      throw new Error("Hay valores invalidos");
    }
    return valor;
  }