import { Router } from 'express';
import { listProducts, getProduct, createProduct } from '../controllers/productController';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', createProduct); // add auth middleware in future

export default router;
