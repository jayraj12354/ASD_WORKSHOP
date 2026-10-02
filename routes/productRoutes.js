const express = require('express');
const productController = require('../controllers/productController');
const { cacheResponse, invalidateCache } = require('../middleware/cacheMiddleware');

const productRoutes = express.Router();

productRoutes.get('/', cacheResponse, productController.getProducts);
productRoutes.get('/:id', cacheResponse, productController.getProductById);
productRoutes.post('/', invalidateCache, productController.createProduct);


productRoutes.put('/:id', invalidateCache, productController.replaceProduct);
productRoutes.patch('/:id', invalidateCache, productController.patchProduct);



productRoutes.delete('/:id', invalidateCache, productController.deleteProduct);

module.exports = productRoutes;