import { Request, Response } from 'express'
import InvoiceService from '../services/invoice-service'

class InvoiceController {
  async create(request: Request, response: Response) {
    if (!request.file) {
      return response.status(400).json({ error: 'Nenhum arquivo recebido.' })
    }

    const createdInvoice = await InvoiceService.create(request.file.buffer)

    return response.status(201).json(createdInvoice)
  }

  async findAll(request: Request, response: Response) {
    const invoices = await InvoiceService.findAll()

    return response.json(invoices)
  }
}

export default new InvoiceController()
