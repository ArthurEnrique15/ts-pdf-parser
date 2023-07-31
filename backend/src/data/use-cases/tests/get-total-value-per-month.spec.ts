import { MockProxy, mock } from 'jest-mock-extended'
import { IGetTotalValuePerMonthInvoiceRepository } from '../../protocols/database/invoice/get-total-value-per-month'
import { GetTotalValuePerMonth } from '../get-total-value-per-month'

describe('GetTotalValuePerMonth', () => {
  let sut: GetTotalValuePerMonth
  let invoiceRepository: MockProxy<IGetTotalValuePerMonthInvoiceRepository>

  const validInvoiceRepositoryResponse = [
    {
      mes_ref: 1,
      ano_ref: 2023,
      mes_ref_string: 'JAN/2023',
      valor_total: 100,
    },
    {
      mes_ref: 2,
      ano_ref: 2023,
      mes_ref_string: 'FEV/2023',
      valor_total: 200,
    },
  ]

  beforeEach(() => {
    invoiceRepository = mock<IGetTotalValuePerMonthInvoiceRepository>()
    sut = new GetTotalValuePerMonth(invoiceRepository)

    invoiceRepository.getTotalValuePerMonth.mockResolvedValue(validInvoiceRepositoryResponse)
  })

  it('should call getTotalValuePerMonthInvoiceRepository', async () => {
    await sut.getTotalValuePerMonth()
    expect(invoiceRepository.getTotalValuePerMonth).toHaveBeenCalledTimes(1)
  })

  it('should return an array on success', async () => {
    const result = await sut.getTotalValuePerMonth()
    expect(result).toEqual(validInvoiceRepositoryResponse)
  })
})
