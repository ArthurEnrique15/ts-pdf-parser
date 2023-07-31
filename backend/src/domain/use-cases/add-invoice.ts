import { InvoiceModel } from '../models/Invoice'

export interface IAddInvoice {
  add(invoiceBuffer: Buffer): Promise<InvoiceModel>
}
