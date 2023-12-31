import { Request, Response } from 'express'
import InvoiceService from '../../services/invoice-service'
import { makeAddInvoice } from '../factories/use-cases/add-invoice'

class InvoiceController {
  async create(request: Request, response: Response) {
    if (!request.file) {
      return response.status(400).json({ error: 'Nenhum arquivo recebido.' })
    }

    const addInvoice = makeAddInvoice()

    const createdInvoice = await addInvoice.add(request.file.buffer)

    return response.status(201).json(createdInvoice)
  }

  async findAll(request: Request, response: Response) {
    const invoices = await InvoiceService.findAll()

    return response.json(invoices)
  }

  async downloadFile(request: Request, response: Response) {
    const { id } = request.headers

    if (!id) {
      return response.status(400).json({ error: 'ID não informado.' })
    }

    const filePath = await InvoiceService.downloadFile(id.toString())

    if (!filePath) {
      return response.status(404).json({ error: 'Nota fiscal não encontrada.' })
    }

    return response.sendFile(filePath)
  }

  async getAmountPerMonth(request: Request, response: Response) {
    const result = await InvoiceService.getAmountPerMonth()

    return response.status(200).json(result)
  }
}

export default new InvoiceController()
