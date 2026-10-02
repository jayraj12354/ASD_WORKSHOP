const productDatabase = require('../database/productDatabase');

async function getProducts() {


  return productDatabase.readProducts();
}

async function getProductById(productId) {


  const products = await productDatabase.readProducts();

  return products.find((product) => product.id === productId) || null;
}

        async function createProduct(product) {


  return productDatabase.createProduct(product);
}



async function replaceProduct(productId, product) {

  return productDatabase.updateProduct(productId, product, true);
}



        async function patchProduct(productId, changes) {
        return productDatabase.updateProduct(productId, changes, false);
        }

async function deleteProduct(productId) {
  return productDatabase.deleteProduct(productId);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  replaceProduct,
  patchProduct,
  deleteProduct,
};