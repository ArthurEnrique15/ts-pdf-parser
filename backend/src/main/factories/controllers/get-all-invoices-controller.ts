import { GetAllInvoicesController } from '../../controllers/get-all-invoices-controller'
import { makeGetAllInvoices } from '../use-cases/get-all-invoices'

export function makeGetAllInvoicesController() {
  const getAllInvoicesUseCase = makeGetAllInvoices()
  return new GetAllInvoicesController(getAllInvoicesUseCase)
}
