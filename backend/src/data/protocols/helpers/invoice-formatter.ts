import { FormattedInvoice } from '../dtos/invoice'

export interface IInvoiceFormatter {
  format(input: string): FormattedInvoice
}
