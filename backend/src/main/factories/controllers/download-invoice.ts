import { DownloadInvoiceController } from '../../controllers/download-invoice'
import { makeDownloadInvoice } from '../use-cases/download-invoice'

export function makeDownloadInvoiceController() {
  const downloadInvoiceUseCase = makeDownloadInvoice()
  return new DownloadInvoiceController(downloadInvoiceUseCase)
}
