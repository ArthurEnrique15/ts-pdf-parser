import { IInvoiceFormatter } from '../../../data/protocols/helpers/invoice-formatter'
import { InvoiceFormatter } from '../../../infra/helpers/invoice-formatter'

export function makeInvoiceFormatter(): IInvoiceFormatter {
  return new InvoiceFormatter()
}
