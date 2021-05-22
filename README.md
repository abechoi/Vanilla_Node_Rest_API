<h1 align="center">
  How to Build a REST API with Vanilla Node
</h1>

## Table of Contents

1. [Setup](#setup)
2. [Routing](#routing)
3. [Controller and Model](#controller-and-model)
4. [GET Products](#get-/api/products)
5. [GET Product](#get-/api/products/:id)
6. [POST Product](#post-/api/products)
7. [UPDATE Product](#update-/api/products/:id)
8. [DELETE Product](#delete-/api/products/:id)

## Setup

```
npm init -y
npm i -D nodemon
npm i uuid
```

package.json

```
// modify scripts
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

## Routing

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

    // 404 - Not Found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
});
```

## Controller and Model

- Model functions are used to Create, Read, Update, and Delete
- Controller functions control status codes, headers, and content types
- Server calls on controller, controller calls on model

## GET /api/products

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

    // 1. Get products.
    const products = await Product.findAll();

    // 2. Respond with status code, header, and products as a string.
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

## GET /api/products/:id

server.js

```
else if(req.url.match(\/api\/products\/\w+\) && req.method === "GET"){

  // Split /api/products/:id by "/", find the 3rd element
  const id = req.url.split("/")[3];

  getProduct(req, res, id);
}
```

productController.js

```
async function getProduct(req, res, id){
  try {

    // 1. Get product by id.
    const product = await Product.findById(id);

    if(!product){

      // 2. If product does not exist, respond with a 404.
      res.writeHead( 404, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: "Product not found!" }))

    } else {

      // 3. Else, respond with product as a string.
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

## POST /api/products

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

    // 1. Request body.
    const body = await getPostData(req);

    // 2. Parse body, then destructure its properties.
    const { title, description, price } = JSON.parse(body);

    // 3. Create product with properties.
    const product = { title, description, price };

    // 4. Get an id from model.
    const newProduct = await Product.create(product);

    // 5. Add header then return newProduct to endpoint.
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
const writeDataToFile = (filename, content) => {

  // convert content to a string and overwrite file
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }

  });
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {

      // 1. Create empty body.
      let body = "";

      // 2. On data, convert chunk to string and add to body.
      // 3. On end, resolve body.
      req.on("data", (chunk) => {
        body += chunk.toString();
      })
      .on("end", () => {
        resolve(body);
      });
    }
    catch (err) {
      reject(err);
    }
  });
};
```

productModel.js

```
const create = (product) => {
  return new Promise((resolve, reject) => {

    // 1. Create object with product and id.
    const newProduct = { id: uuidv4(), ...product };

    // 2. Push object into products.
    products.push(newProduct);

    // 3. Overwrite old products.
    writeDataToFile("./data/products.json", products);

    // 4. Resolve newProduct.
    resolve(newProduct);

  });
};
```

## UPDATE /api/products/:id

server.js

```
else if( req.url.match(\/api/\products\/\w+\) && req.method === "PUT" ){
  const id = req.url.split("/")[3];
  updateProduct(req, res, id);
}
```

productController.js

```
async function updateProduct(req, res, id){
  try{

    // 1. Get product by id.
    const product = await Product.findById(id);

    if(!product){

      // 2. If product does not exist, respond with a 404.
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found!" }))

    }else{

      // 3. Request body.
      const body = await getPostData(req);

      // 4. Parse body, then destructure its properties.
      const { title, description, price } = JSON.parse(body);

      // 5. Create newProduct with old and new properties.
      const newProduct = {
        title: title || product.title;
        description: description || product.description;
        price: price || product.price
      };

      // 6. Create updatedProduct from model with id and newProduct.
      const updatedProduct = await Product.update(id, newProduct);

      // 7. Add header then return newProduct to endpoint.
      res.writeHead( 200, { "Content-Type": "application/json" } );
      res.end(JSON.stringify(updatedProduct));

    }

  }catch(err){
    console.log(err);
  }
}
```

productModel.js

```
const update = (id, newProduct) => {
  return new Promise((resolve, reject) => {

    // 1. Get index by id.
    const index = products.findIndex(product => product.id === id);

    // 2. Replace products[index] with a id and newProduct.
    products[index] = { id, ...newProduct };

    // 3. Overwrite old products.
    if( process.env.NODE_ENV !== "test" ){
      writeDataToFile("./data/products.json", products);
    }

    // 4. Resolve products[index].
    resolve(products[index]);

  });
}
```

## DELETE /api/products/:id

server.js

```

```

productController.js

```

```

productModel.js

```

```
