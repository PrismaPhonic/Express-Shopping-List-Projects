const { read, write } = require("./writetofile");
const file = 'items.json';

class Product {
  constructor(product, price, id) {
    this.id = id;
    this.product = product;
    this.price = price;

  }

  static async addProduct(product, price) {
    let itemsJSON = await read(file);
    let items = JSON.parse(itemsJSON);
    let highestId = +items[items.length - 1].id;
    let id = highestId + 1;
    let newProduct = new Product(product, price, id);
    items.push(newProduct);
    await write(JSON.stringify(items), file);
    return newProduct;
  }

}

module.exports = Product;