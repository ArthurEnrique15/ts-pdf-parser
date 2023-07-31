import { InvoiceRepository } from '../../../infra/database/invoice-repository'

export function makeInvoiceRepository() {
  return new InvoiceRepository()
}
