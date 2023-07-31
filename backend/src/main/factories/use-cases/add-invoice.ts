import { AddInvoice } from '../../../data/use-cases/add-invoice'
import { IAddInvoice } from '../../../domain/use-cases/add-invoice'
import { makeFileManager } from '../adapters/file-manager'
import { makeFileParser } from '../adapters/file-parser'
import { makeInvoiceRepository } from '../database/invoice-repository'
import { makeInvoiceFormatter } from '../helpers/invoice-formatter'

export function makeAddInvoice(): IAddInvoice {
  const fileParser = makeFileParser()
  const invoiceFormatter = makeInvoiceFormatter()
  const addInvoiceRepository = makeInvoiceRepository()
  const fileManager = makeFileManager()

  return new AddInvoice(fileParser, invoiceFormatter, addInvoiceRepository, fileManager)
}
