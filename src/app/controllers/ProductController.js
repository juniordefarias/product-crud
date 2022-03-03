const CategoriesRepository = require('../repositories/CategoriesRepository');
const ProductsRepository = require('../repositories/ProductsRepository');

class ProductController {
  async index(request, response) {
    const products = await ProductsRepository.findAll();

    response.json(products);
  }

  async show(request, response) {
    const { id } = request.params;
    // id = Number(id);

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return response.json({ error: 'product not found' });
    }

    response.json(product);
  }

  async store(request, response) {
    const {
      ean13, description, ncm, cost, st, ipi, price, stock, category_id: categoryId,
    } = request.body;

    const ean13Exist = await ProductsRepository.findByEan13(ean13);
    if (ean13Exist) {
      return response.status(400).json({ error: 'ean-13 already have been registered' });
    }

    const categoryIdExist = await CategoriesRepository.findById(categoryId);
    if (!categoryIdExist) {
      return response.status(404).json({ error: 'category not found' });
    }

    const product = await ProductsRepository.create({
      ean13, description, ncm, cost, st, ipi, price, stock, categoryId,
    });

    response.json(product);

    /* const array = [ean13, description, ncm, cost, st, ipi, price, stock, categoryId];
    array.forEach((item) => console.log(item, typeof item));

    response.sendStatus(204); */
  }

  async update(request, response) {
    const { id } = request.params;
    // id = Number(id);

    const {
      ean13, description, ncm, cost, st, ipi, price, stock, category_id: categoryId,
    } = request.body;

    const productExist = await ProductsRepository.findById(id);

    if (!productExist) {
      return response.status(404).json({ error: 'product not found' });
    }

    const productByEan13 = await ProductsRepository.findByEan13(ean13);
    if (productByEan13 && productByEan13.id !== id) {
      return response.status(400).json({ error: 'ean-13 already have been registered' });
    }

    const categoryIdExist = await CategoriesRepository.findById(categoryId);
    if (!categoryIdExist) {
      return response.status(404).json({ error: 'category not found' });
    }

    const product = await ProductsRepository.update(id, {
      ean13, description, ncm, cost, st, ipi, price, stock, categoryId,
    });

    response.status(200).json(product);
  }

  async delete(request, response) {
    const { id } = request.params;
    // id = Number(id);

    const productExist = await ProductsRepository.findById(id);

    if (!productExist) {
      return response.status(404).json({ error: 'user not found' });
    }

    await ProductsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProductController();
