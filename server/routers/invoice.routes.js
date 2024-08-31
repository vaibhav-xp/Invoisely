import express from 'express';
import isUserAuthorized from '../middlewares/auth.middleware.js';
import productController from '../contorollers/invoice.controller.js';

const productRouter = express.Router();

productRouter.post('/', isUserAuthorized, productController.addInvoice);
productRouter.get('/', isUserAuthorized, productController.getInvoices);
productRouter.get('/:id', isUserAuthorized, productController.getInvoiceById);

export default productRouter;