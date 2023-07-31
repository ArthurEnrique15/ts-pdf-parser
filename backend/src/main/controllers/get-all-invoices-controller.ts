import { Request, Response } from 'express'
import { IGetAllInvoices } from '../../domain/use-cases/get-all-invoices'

export class GetAllInvoicesController {
  constructor(private readonly getInvoicesUseCase: IGetAllInvoices) {}

  async getAll(request: Request, response: Response) {
    const invoices = await this.getInvoicesUseCase.getAll()
    return response.status(200).json(invoices)
  }
}
