const file = 'items.json';
const fs = require("fs");
const util = require('util');

class Product {
  constructor(product, price, id) {
    this.id = id;
    this.product = product;
    this.price = price;
  }

  static _write(data, file) {
    const writeFilePromise = util.promisify(fs.writeFile);
    return writeFilePromise(file, data, "utf8");
  }

  static _read(path) {
    const readFilePromise = util.promisify(fs.readFile);
    return readFilePromise(path, "utf8");
  }

  static async getProduct(product_id) {
    const items = this.getAllProducts();
    const index = items.findIndex(item => item.id === product_id);
    const item = items[index];
    return new Product(item.product, item.price, item.id);
  }

  static async getAllProducts() {
    const itemsJSON = await Product._read(file);
    return JSON.parse(itemsJSON);
  }

  static async addProduct(product, price) {
    //read items from JSON file and parse to object to work with
    let itemsJSON = await this._read(file);
    let items = JSON.parse(itemsJSON);

    //find product with highest id and increment id of
    //new product by 1
    let highestId = +items[items.length - 1].id;
    let id = highestId + 1;

    let newProduct = new Product(product, price, id);
    items.push(newProduct);
    await this._write(JSON.stringify(items), file);
    return newProduct;
  }

}

module.exports = Product;