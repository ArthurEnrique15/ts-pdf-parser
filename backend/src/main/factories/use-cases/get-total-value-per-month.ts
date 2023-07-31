import { GetTotalValuePerMonth } from '../../../data/use-cases/get-total-value-per-month'
import { IGetTotalValuePerMonth } from '../../../domain/use-cases/get-total-value-per-month'
import { makeInvoiceRepository } from '../database/invoice-repository'

export function makeGetTotalValuePerMonth(): IGetTotalValuePerMonth {
  const invoiceRepository = makeInvoiceRepository()
  return new GetTotalValuePerMonth(invoiceRepository)
}
