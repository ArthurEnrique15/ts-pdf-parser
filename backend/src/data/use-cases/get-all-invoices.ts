import { InvoiceModel } from '../../domain/models/Invoice'
import { IGetAllInvoices } from '../../domain/use-cases/get-all-invoices'
import { IFindAllInvoicesRepository } from '../protocols/database/invoice/find-all'

export class GetAllInvoices implements IGetAllInvoices {
  constructor(private readonly invoiceRepository: IFindAllInvoicesRepository) {}

  async getAll(): Promise<InvoiceModel[]> {
    const invoices = await this.invoiceRepository.findAll()
    return invoices
  }
}
