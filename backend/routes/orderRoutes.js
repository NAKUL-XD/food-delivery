import express from 'express';
import { listOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/list', listOrders);

export default router;
