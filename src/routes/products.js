const express = require("express");
const router = express.Router();

const controllerProduct = require("../controller/products");

router.get("/products", controllerProduct.getProduct);
router.post("/product", controllerProduct.createProduct);

module.exports = router;
