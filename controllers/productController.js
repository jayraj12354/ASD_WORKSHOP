const productService = require('../services/productService');

function getProductId(request, response) {


  const productId = Number(request.params.id);

  if (!Number.isInteger(productId)) {
    response.status(400).json({ error: 'Product id must be an integer' });
    return null;



  }

  return productId;
}

async function getProducts(request, response) {



  response.json(await productService.getProducts());
}

async function getProductById(request, response) {



  const productId = getProductId(request, response);
  if (productId === null) return;

  const product = await productService.getProductById(productId);
  if (!product) {


    response.status(404).json({ error: 'Product not found' });
    return;
  }

  response.json(product);
}

function validateProductBody(request, response) {


  if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
    response.status(400).json({ error: 'Product body must be an object' });


    return false;
  }

  return true;
}

async function createProduct(request, response) {


  if (!validateProductBody(request, response)) return;
  response.status(201).json(await productService.createProduct(request.body));
}

async function replaceProduct(request, response) {
  const productId = getProductId(request, response);


  if (productId === null || !validateProductBody(request, response)) return;

  const product = await productService.replaceProduct(productId, request.body);
  if (!product) {
    response.status(404).json({ error: 'Product not found' });
    return;
  }

  response.json(product);
}

async function patchProduct(request, response) {
  const productId = getProductId(request, response);


  if (productId === null || !validateProductBody(request, response)) return;

  const product = await productService.patchProduct(productId, request.body);
  if (!product) {


    response.status(404).json({ error: 'Product not found' });


    return;
  }

  response.json(product);
}

async function deleteProduct(request, response) {


  const productId = getProductId(request, response);
  if (productId === null) return;


  const deleted = await productService.deleteProduct(productId);


  if (!deleted) {
    response.status(404).json({ error: 'Product not found' });


    return;
  }

  response.status(204).send();

  
}



module.exports = {
  getProducts,
  getProductById,
  createProduct,
  replaceProduct,
  patchProduct,
  deleteProduct,
};