const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require("./controllers/productController");

const server = http.createServer((req, res) => {
  // get products only with GET method and at "/api/products"
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  }
  // get product by id, products/1 - products/1000
  else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    // regex req.url.split("/")[2] splits url: api/products/3 into array by /
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  }
  // create a product
  else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  }
  // update a product
  else if (req.url.match(/\/api\/products\/\w+/) && req.method === "PUT") {
    // regex req.url.split("/")[2] splits url: api/products/3 into array by /
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  }
  // default catch all
  else {
    // writeHead(arg1, arg2)
    // arg1 is a status code, arg2 is an object
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
});

// Check for environment variable OR 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to port:${PORT}`));
