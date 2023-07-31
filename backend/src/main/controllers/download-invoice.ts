import { Request, Response } from 'express'
import { IDownloadInvoice } from '../../domain/use-cases/download-invoice'

export class DownloadInvoiceController {
  constructor(private readonly downloadInvoiceUseCase: IDownloadInvoice) {}

  async download(request: Request, response: Response) {
    const { id } = request.headers

    if (!id) {
      return response.status(400).json({ error: 'ID não informado.' })
    }

    const filePath = await this.downloadInvoiceUseCase.download(id.toString())

    return response.sendFile(filePath)
  }
}
