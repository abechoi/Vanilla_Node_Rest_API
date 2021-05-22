// Controller functions control status codes, headers, and content types
const Product = require("../models/productModel");

const { getPostData } = require("../utils");

// @desc  Get all products
// @route GET /api/products
async function getProducts(_, res) {
  try {
    const products = await Product.findAll();
    // writeHead(arg1, arg2)
    // arg1 is a status code, arg2 is an object
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

// @desc  Get a product by id
// @route GET /api/products/:id
async function getProduct(_, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found!" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);
  }
}

// @desc  Create a product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    // 1. request body
    const body = await getPostData(req);
    // 2. parse body, then destructure its properties
    const { title, description, price } = JSON.parse(body);
    // 3. create product with properties
    const product = { title, description, price };
    // 4. get an id from model
    const newProduct = await Product.create(product);
    // 5. add header then return newProduct to endpoint
    // 201 - created
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

// @desc  Update a product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found!" }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const newProduct = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, newProduct);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};
