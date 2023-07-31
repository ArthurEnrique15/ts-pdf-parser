import { Router } from 'express'
import multer from 'multer'
import InvoiceController from './controllers/invoice-controller'
import { makeAddInvoiceController } from './factories/controllers/add-invoice-controller'
import { makeGetAllInvoicesController } from './factories/controllers/get-all-invoices-controller'

const router = Router()

const upload = multer()

const addInvoiceController = makeAddInvoiceController()
const getAllInvoicesController = makeGetAllInvoicesController()

router.post('/', upload.single('pdfFile'), addInvoiceController.add.bind(addInvoiceController))
router.get('/', getAllInvoicesController.getAll.bind(getAllInvoicesController))
router.get('/download', InvoiceController.downloadFile)
router.get('/energy-per-month', InvoiceController.getAmountPerMonth)

export { router }
