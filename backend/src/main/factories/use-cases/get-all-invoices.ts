import { GetAllInvoices } from '../../../data/use-cases/get-all-invoices'
import { IGetAllInvoices } from '../../../domain/use-cases/get-all-invoices'
import { makeInvoiceRepository } from '../database/invoice-repository'

export function makeGetAllInvoices(): IGetAllInvoices {
  const invoiceRepository = makeInvoiceRepository()
  return new GetAllInvoices(invoiceRepository)
}
