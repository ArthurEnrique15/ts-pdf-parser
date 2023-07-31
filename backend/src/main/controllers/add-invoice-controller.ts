import { Request, Response } from 'express'
import { IAddInvoice } from '../../domain/use-cases/add-invoice'

export class AddInvoiceController {
  constructor(private readonly addInvoiceUseCase: IAddInvoice) {}

  async add(request: Request, response: Response) {
    if (!request.file) {
      return response.status(400).json({ error: 'Nenhum arquivo recebido.' })
    }

    const createdInvoice = await this.addInvoiceUseCase.add(request.file.buffer)

    return response.status(201).json(createdInvoice)
  }
}
