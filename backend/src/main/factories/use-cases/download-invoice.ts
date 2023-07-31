import { DownloadInvoice } from '../../../data/use-cases/download-invoice'
import { IDownloadInvoice } from '../../../domain/use-cases/download-invoice'
import { makeFileManager } from '../adapters/file-manager'
import { makeInvoiceRepository } from '../database/invoice-repository'

export function makeDownloadInvoice(): IDownloadInvoice {
  const invoiceRepository = makeInvoiceRepository()
  const fileManager = makeFileManager()

  return new DownloadInvoice(invoiceRepository, fileManager)
}
