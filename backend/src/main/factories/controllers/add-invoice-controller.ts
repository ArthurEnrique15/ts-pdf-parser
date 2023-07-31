import { AddInvoiceController } from '../../controllers/add-invoice-controller'
import { makeAddInvoice } from '../use-cases/add-invoice'

export function makeAddInvoiceController() {
  const addInvoiceUseCase = makeAddInvoice()

  return new AddInvoiceController(addInvoiceUseCase)
}
