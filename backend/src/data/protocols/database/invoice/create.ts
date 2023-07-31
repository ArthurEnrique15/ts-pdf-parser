import { InvoiceModel } from '../../../../domain/models/Invoice'
import { FormattedInvoice } from '../../dtos/invoice'

export interface IAddInvoiceRepository {
  add(invoiceData: FormattedInvoice): Promise<InvoiceModel>
}
