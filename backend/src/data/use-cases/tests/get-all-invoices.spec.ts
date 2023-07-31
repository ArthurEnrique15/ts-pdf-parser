import { MockProxy, mock } from 'jest-mock-extended'
import { IFindAllInvoicesRepository } from '../../protocols/database/invoice/find-all'
import { GetAllInvoices } from '../get-all-invoices'
import { InvoiceModel } from '../../../domain/models/Invoice'

describe('GetAllInvoices', () => {
  let sut: GetAllInvoices
  let invoiceRepository: MockProxy<IFindAllInvoicesRepository>

  const validInvoiceRepositoryResponse = [
    {
      id: 'valid_id',
      numero_cliente: 'valid_numero_cliente',
    },
    {
      id: 'valid_id_2',
      numero_cliente: 'valid_numero_cliente_2',
    },
  ] as InvoiceModel[]

  beforeEach(() => {
    invoiceRepository = mock<IFindAllInvoicesRepository>()
    sut = new GetAllInvoices(invoiceRepository)

    invoiceRepository.findAll.mockResolvedValue(validInvoiceRepositoryResponse)
  })

  it('should call findAllInvoicesRepository', async () => {
    await sut.getAll()
    expect(invoiceRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return an array of invoices on success', async () => {
    const invoices = await sut.getAll()
    expect(invoices).toEqual(validInvoiceRepositoryResponse)
  })
})
