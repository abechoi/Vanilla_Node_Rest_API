<h1 align="center">
  How to Build a REST API with Vanilla Node
</h1>

## Table of Contents

1. [Setup](#setup)
2. [Setup](#routing)
3. [Setup](#controller-and-model)
4. [Setup](#get-/api/products)
5. [Setup](#get-/api/products/:id)
6. [Setup](#post-/api/products)
7. [Setup](#update-/api/products/:id)
8. [Setup](#delete-/api/products/:id)

## 1. ## Setup

```
npm init -y
npm i -D nodemon
npm i uuid
```

package.json

```
# modify scripts
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
},
```

server.js

```
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.end();
});

// Check for environment variable OR 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to port:${PORT}`));
```

```
# run the server
npm run dev
```

## 2. ## Routing

server.js

```
const server = http.createServer((req, res) => {
  // get products only with GET method and at "/api/products"
  if (req.url === "/api/products" && req.method === "GET") {
    // writeHead(arg1, arg2)
    // arg1 is a status code, arg2 is an object
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
});
```

## 3. ## Controller and Model

- Model functions are used to Create, Read, Update, and Delete
- Controller functions control status codes, headers, and content types
- Server calls on controller, controller calls on model

## 4. ## GET /api/products

server.js

```
if (req.url === "/api/products" && req.method === "GET") {
  getProducts(req, res);
}
```

productController.js

```
async function getProducts(_, res) {
  try {
    const products = await Products.findAll();
    // writeHead(arg1, arg2)
    // arg1 is a status code, arg2 is an object
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}
```

productModel.js

```
const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};
```

## 5. ## GET /api/products/:id

server.js

```
else if(req.url.match(\/api\/products\/[0-9]+\) && req.method === "GET"){
  getProduct(req, res, id);
}
```

productController.js

```
async function getProduct(req, res, id){

  try {

    const product = await Products.findById(id);

    if(!product){
      res.writeHead( 404, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: "Product not found!" }))
    } else {
      res.writeHead( 200, { "Content-Type": "application/json" })
      res.end(JSON.stringify(product))
    }

  } catch(err) {
    console.log(err)
  }
}
```

productModel.js

```
const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find(product => product.id === id)
    resolve(product)
  });
}
```

## 6. ## POST /api/products

server.js

```
else if(req.url === "/api/products" && req.method === "POST){
  createProduct(req, res);
}
```

productController.js

```
async function createProduct(req, res) {
  try {

    // 1. request body
    const body = await getPostData(req);

    // 2. parse body, then destructure its properties
    const { title, description, price } = JSON.parse(body);

    // 3. create product with properties
    const product = { title, description, price };

    // 4. get an id from model
    const newProduct = await Products.create(product);

    // 5. add header then return newProduct to endpoint
    // 201 - created
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));

  } catch (err) {
    console.log(err);
  }
}
```

utils.js

```
const getPostData = (req) => {

  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};
```

productModel.js

```
const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
};
```

## 7. ## UPDATE /api/products/:id

server.js

```

```

productController.js

```

```

productModel.js

```

```

## 8. ## DELETE /api/products/:id

server.js

```

```

productController.js

```

```

productModel.js

```

```
