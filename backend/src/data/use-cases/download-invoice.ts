import { IDownloadInvoice } from '../../domain/use-cases/download-invoice'
import { IFileManager } from '../protocols/adapters/file-manager'
import { IFindInvoiceByIdRepository } from '../protocols/database/invoice/find-by-id'

export class DownloadInvoice implements IDownloadInvoice {
  constructor(
    private readonly invoiceRepository: IFindInvoiceByIdRepository,
    private readonly fileManager: IFileManager,
  ) {}

  async download(id: string): Promise<string> {
    const invoice = await this.invoiceRepository.findById(id)

    if (!invoice) {
      throw new Error('Fatura não encontrada')
    }

    const fileExists = this.fileManager.checkIfFileExists(`../../tmp/${id}.pdf`)

    if (!fileExists) {
      throw new Error('Arquivo não encontrado')
    }

    return this.fileManager.getFilePath(`../../tmp/${id}.pdf`)
  }
}
