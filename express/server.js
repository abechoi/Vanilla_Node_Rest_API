const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const Product = require("../models/productModel");
const { getPostData } = require("../utils");
const url = "/api/products";

app.get(url, async (_, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
});

app.get(`${url}/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    console(err);
  }
});

app.post(url, async (req, res) => {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = { title, description, price };

    const newProduct = await Product.create(product);

    res.status(201).json(newProduct);
  } catch (err) {
    console(err);
  }
});

app.put(`${url}/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).send("Product not found!");
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);
      const newProduct = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updatedProduct = await Product.update(req.params.id, newProduct);

      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("*", function (_, res) {
  res.send("Page not found!", 404);
});

app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
