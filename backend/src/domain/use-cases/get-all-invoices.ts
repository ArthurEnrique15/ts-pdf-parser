import { InvoiceModel } from '../models/Invoice'

export interface IGetAllInvoices {
  getAll(): Promise<InvoiceModel[]>
}
