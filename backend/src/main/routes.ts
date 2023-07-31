import { Router } from 'express'
import multer from 'multer'
import { makeAddInvoiceController } from './factories/controllers/add-invoice-controller'
import { makeGetAllInvoicesController } from './factories/controllers/get-all-invoices-controller'
import { makeDownloadInvoiceController } from './factories/controllers/download-invoice'
import { makeGetTotalValuePerMonthController } from './factories/controllers/get-total-value-per-month'

const router = Router()

const upload = multer()

const addInvoiceController = makeAddInvoiceController()
const getAllInvoicesController = makeGetAllInvoicesController()
const downloadInvoiceController = makeDownloadInvoiceController()
const getTotalValuePerMonthController = makeGetTotalValuePerMonthController()

router.post('/', upload.single('pdfFile'), addInvoiceController.add.bind(addInvoiceController))
router.get('/', getAllInvoicesController.getAll.bind(getAllInvoicesController))
router.get('/download', downloadInvoiceController.download.bind(downloadInvoiceController))
router.get(
  '/energy-per-month',
  getTotalValuePerMonthController.getTotalValuePerMonth.bind(getTotalValuePerMonthController),
)

export { router }
