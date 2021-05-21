// Model functions are used to Create, Read, Update, and Delete
const products = require("../data/products");

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((product) => product.id === id);
    resolve(product);
  });
};

module.exports = {
  findAll,
  findById,
};
