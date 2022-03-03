// let products = require('../mocks/products');

const db = require('../../database');

class ProductsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM products');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return row;
  }

  async findByEan13(ean13) {
    const [row] = await db.query('SELECT * FROM products WHERE ean13 = $1', [ean13]);
    return row;
  }

  async create({
    ean13, description, ncm, cost, st, ipi, price, stock, categoryId,
  }) {
    const [row] = await db.query(`
      INSERT INTO products(ean13, description, ncm, cost, st, ipi, price, stock, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [ean13, description, ncm, cost, st, ipi, price, stock, categoryId]);
    return row;
  }

  async update(id, {
    ean13, description, ncm, cost, st, ipi, price, stock, categoryId,
  }) {
    const [row] = await db.query(`
      UPDATE products
      SET ean13 = $1, description = $2, ncm = $3, cost = $4, st = $5, ipi = $6, price = $7, stock = $8, category_id = $9
      WHERE id = $10
      RETURNING *
    `, [ean13, description, ncm, cost, st, ipi, price, stock, categoryId, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ProductsRepository();
