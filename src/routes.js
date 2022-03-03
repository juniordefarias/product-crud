const { Router } = require('express');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

const ProductController = require('./app/controllers/ProductController');

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.delete('/products/:id', ProductController.delete);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
