const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const {name,description,price,category,skuCode} = req.body;
    const product = new Product({ name,description,price,category,skuCode});
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
