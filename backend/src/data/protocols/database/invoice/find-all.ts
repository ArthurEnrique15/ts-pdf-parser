import { InvoiceModel } from '../../../../domain/models/Invoice'

export interface IFindAllInvoicesRepository {
  findAll(): Promise<InvoiceModel[]>
}
