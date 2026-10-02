const fs = require('fs').promises;
const path = require('path');

const databasePath = path.join(__dirname, '..', 'db.json');

async function readProducts() {

  const fileContents = await fs.readFile(databasePath, 'utf8');


  return JSON.parse(fileContents);
}



async function writeProducts(products) {

  await fs.writeFile(databasePath, `${JSON.stringify(products, null, 2)}\n`);
}

async function createProduct(product) {
  const products = await readProducts();

  const nextId = products.reduce((highestId, currentProduct) => Math.max(highestId, currentProduct.id), 0) + 1;
    const newProduct = { id: nextId, ...product };


  products.push(newProduct);

    await writeProducts(products);
  return newProduct;
}

async function updateProduct(productId, changes, replaceProduct) {
  const products = await readProducts();
  const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
    return null;
  }

  const updatedProduct = replaceProduct
    ? { ...changes, id: productId }: { ...products[productIndex], ...changes, id: productId };

  products[productIndex] = updatedProduct;
  await writeProducts(products);
  return updatedProduct;
}

async function deleteProduct(productId) {
  const products = await readProducts();
  const remainingProducts = products.filter((product) => product.id !== productId);

  if (remainingProducts.length === products.length) {
    return false;
  }



  await writeProducts(remainingProducts);
  return true;
}

module.exports = {
  readProducts,
  createProduct,
  updateProduct,
  deleteProduct,




  
};