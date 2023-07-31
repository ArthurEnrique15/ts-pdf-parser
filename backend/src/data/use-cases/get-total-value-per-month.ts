import { IGetTotalValuePerMonth, ValuePerMonth } from '../../domain/use-cases/get-total-value-per-month'
import { IGetTotalValuePerMonthInvoiceRepository } from '../protocols/database/invoice/get-total-value-per-month'

export class GetTotalValuePerMonth implements IGetTotalValuePerMonth {
  constructor(private readonly invoiceRepository: IGetTotalValuePerMonthInvoiceRepository) {}

  async getTotalValuePerMonth(): Promise<ValuePerMonth[]> {
    const totalValuePerMonth = await this.invoiceRepository.getTotalValuePerMonth()
    return totalValuePerMonth
  }
}
