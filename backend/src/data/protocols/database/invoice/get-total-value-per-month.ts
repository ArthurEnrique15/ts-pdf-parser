import { ValuePerMonth } from '../../../../domain/use-cases/get-total-value-per-month'

export interface IGetTotalValuePerMonthInvoiceRepository {
  getTotalValuePerMonth(): Promise<ValuePerMonth[]>
}
