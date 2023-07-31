import { mock, MockProxy } from 'jest-mock-extended'

import { AddInvoice } from '../add-invoice'
import { IFileManager } from '../../protocols/adapters/file-manager'
import { IFileParser } from '../../protocols/adapters/file-parser'
import { IAddInvoiceRepository } from '../../protocols/database/invoice/create'
import { IInvoiceFormatter } from '../../protocols/helpers/invoice-formatter'
import { InvoiceModel } from '../../../domain/models/Invoice'

describe('AddInvoice', () => {
  let sut: AddInvoice
  let fileParser: MockProxy<IFileParser>
  let invoiceFormatter: MockProxy<IInvoiceFormatter>
  let addInvoiceRepository: MockProxy<IAddInvoiceRepository>
  let fileManager: MockProxy<IFileManager>

  const validFileParserResponse = 'invoice_string'

  const validInvoiceFormatterResponse = {
    numero_cliente: 'valid_numero_cliente',
    mes_ref_string: 'valid_mes_ref_string',
    mes_ref: 1,
    ano_ref: 2023,
    data_vencimento: 'valid_data_vencimento',
    energia_eletrica: {
      kwh: 1,
      preco_unit: 1,
      valor: 1,
    },
    energia_injetada: {
      kwh: 1,
      preco_unit: 1,
      valor: 1,
    },
    en_comp_sem_icms: {
      kwh: 1,
      preco_unit: 1,
      valor: 1,
    },
    contrib_ilum_publica: 1,
    valor_total: 1,
  }

  const validAddInvoiceRepositoryResponse = {
    id: 'valid_id',
    numero_cliente: 'valid_numero_cliente',
  } as InvoiceModel

  beforeEach(() => {
    fileParser = mock<IFileParser>()
    invoiceFormatter = mock<IInvoiceFormatter>()
    addInvoiceRepository = mock<IAddInvoiceRepository>()
    fileManager = mock<IFileManager>()
    sut = new AddInvoice(fileParser, invoiceFormatter, addInvoiceRepository, fileManager)

    fileParser.parse.mockResolvedValue(validFileParserResponse)
    invoiceFormatter.format.mockReturnValue(validInvoiceFormatterResponse)
    addInvoiceRepository.add.mockResolvedValue(validAddInvoiceRepositoryResponse)
  })

  const validBuffer: Buffer = Buffer.from('any_buffer')

  it('should call FileParser with correct buffer', async () => {
    await sut.add(validBuffer)

    expect(fileParser.parse).toHaveBeenCalledTimes(1)
    expect(fileParser.parse).toHaveBeenCalledWith(validBuffer)
  })

  it('should call InvoiceFormatter with correct string', async () => {
    await sut.add(validBuffer)

    expect(invoiceFormatter.format).toHaveBeenCalledTimes(1)
    expect(invoiceFormatter.format).toHaveBeenCalledWith(validFileParserResponse)
  })

  it('should call AddInvoiceRepository with correct invoice', async () => {
    await sut.add(validBuffer)

    expect(addInvoiceRepository.add).toHaveBeenCalledTimes(1)
    expect(addInvoiceRepository.add).toHaveBeenCalledWith(validInvoiceFormatterResponse)
  })

  it('should call FileManager with correct values', async () => {
    await sut.add(validBuffer)

    expect(fileManager.createFile).toHaveBeenCalledTimes(1)
    expect(fileManager.createFile).toHaveBeenCalledWith(validAddInvoiceRepositoryResponse.id, validBuffer)
  })

  it('should return an invoice on success', async () => {
    const result = await sut.add(validBuffer)
    expect(result).toEqual(validAddInvoiceRepositoryResponse)
  })
})
