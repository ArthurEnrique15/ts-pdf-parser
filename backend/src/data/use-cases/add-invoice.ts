import { InvoiceModel } from '../../domain/models/Invoice'
import { IAddInvoice } from '../../domain/use-cases/add-invoice'
import { IFileManager } from '../protocols/adapters/file-manager'
import { IFileParser } from '../protocols/adapters/file-parser'
import { IAddInvoiceRepository } from '../protocols/database/invoice/create'
import { IInvoiceFormatter } from '../protocols/helpers/invoice-formatter'

export class AddInvoice implements IAddInvoice {
  constructor(
    private readonly fileParser: IFileParser,
    private readonly invoiceFormatter: IInvoiceFormatter,
    private readonly addInvoiceRepository: IAddInvoiceRepository,
    private readonly fileManager: IFileManager,
  ) {}

  async add(invoiceBuffer: Buffer): Promise<InvoiceModel> {
    const invoiceString = await this.fileParser.parse(invoiceBuffer)

    const formattedInvoice = this.invoiceFormatter.format(invoiceString)

    const invoice = await this.addInvoiceRepository.add(formattedInvoice)

    this.fileManager.createFile(invoice.id, invoiceBuffer)

    return invoice
  }
}
