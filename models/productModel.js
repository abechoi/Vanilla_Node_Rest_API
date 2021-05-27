// Model functions are used to Create, Read, Update, and Delete
const products = require("../data/products");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

const findAll = () => {
  return new Promise((resolve, _) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve, _) => {
    const product = products.find((product) => product.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve, _) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/products.json", products);
    }
    resolve(newProduct);
  });
};

const update = (id, newProduct) => {
  return new Promise((resolve, _) => {
    const index = products.findIndex((product) => product.id === id);
    products[index] = { id, ...newProduct };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/products.json", products);
    }
    resolve(products[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, _) => {
    const newProducts = products.filter((product) => product.id !== id);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/products.json", newProducts);
    }
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
