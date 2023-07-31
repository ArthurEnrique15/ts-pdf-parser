import { InvoiceModel } from '../models/Invoice'

export interface IGetInvoices {
  getAllInvoices(): Promise<InvoiceModel[]>
}
