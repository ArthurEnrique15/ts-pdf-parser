import { Router } from 'express'
import multer from 'multer'
import InvoiceController from './controllers/invoice-controller'

const router = Router()

const upload = multer()

router.post('/', upload.single('pdfFile'), InvoiceController.create)
router.get('/', InvoiceController.findAll)
router.get('/download', InvoiceController.downloadFile)
router.get('/energy-per-month', InvoiceController.getAmountPerMonth)

export { router }
