import { MockProxy, mock } from 'jest-mock-extended'
import { DownloadInvoice } from '../download-invoice'
import { IFileManager } from '../../protocols/adapters/file-manager'
import { IFindInvoiceByIdRepository } from '../../protocols/database/invoice/find-by-id'
import { InvoiceModel } from '../../../domain/models/Invoice'

describe('DownloadInvoice', () => {
  let sut: DownloadInvoice
  let invoiceRepository: MockProxy<IFindInvoiceByIdRepository>
  let fileManager: MockProxy<IFileManager>

  const validInvoiceRepositoryResponse = {
    id: 'valid_id',
    numero_cliente: 'valid_numero_cliente',
  } as InvoiceModel

  beforeEach(() => {
    invoiceRepository = mock<IFindInvoiceByIdRepository>()
    fileManager = mock<IFileManager>()
    sut = new DownloadInvoice(invoiceRepository, fileManager)

    invoiceRepository.findById.mockResolvedValue(validInvoiceRepositoryResponse)
    fileManager.checkIfFileExists.mockReturnValue(true)
    fileManager.getFilePath.mockReturnValue('valid_file_path')
  })

  it('should call findInvoiceByIdRepository with correct id', async () => {
    await sut.download('valid_id')

    expect(invoiceRepository.findById).toHaveBeenCalledWith('valid_id')
    expect(invoiceRepository.findById).toHaveBeenCalledTimes(1)
  })

  it('should throw if findInvoiceByIdRepository returns null', async () => {
    invoiceRepository.findById.mockResolvedValueOnce(null)

    const promise = sut.download('valid_id')

    await expect(promise).rejects.toThrow(new Error('Fatura não encontrada'))
  })

  it('should call fileManager with correct fileName', async () => {
    await sut.download('valid_id')

    expect(fileManager.checkIfFileExists).toHaveBeenCalledWith('valid_id')
    expect(fileManager.checkIfFileExists).toHaveBeenCalledTimes(1)
  })

  it('should throw if fileManager returns false', async () => {
    fileManager.checkIfFileExists.mockReturnValueOnce(false)

    const promise = sut.download('valid_id')

    await expect(promise).rejects.toThrow(new Error('Arquivo não encontrado'))
  })

  it('should call fileManager.getFilePath with correct fileName', async () => {
    await sut.download('valid_id')

    expect(fileManager.getFilePath).toHaveBeenCalledWith('valid_id')
    expect(fileManager.getFilePath).toHaveBeenCalledTimes(1)
  })

  it('should return a filePath on success', async () => {
    const filePath = await sut.download('valid_id')

    expect(filePath).toBe('valid_file_path')
  })
})
