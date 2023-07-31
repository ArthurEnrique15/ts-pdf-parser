import { InvoiceModel } from '../../../../domain/models/Invoice'

export interface IFindInvoiceByIdRepository {
  findById: (id: string) => Promise<InvoiceModel | null>
}
