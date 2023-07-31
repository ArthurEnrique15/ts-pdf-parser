import pdfParse from 'pdf-parse'
import { FileParser } from '../file-parser'

jest.mock('pdf-parse', () => jest.fn())

describe('FileParser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const sut = new FileParser()

  it('should call pdfParse with correct file buffer', async () => {
    await sut.parse(Buffer.from('any_file_buffer'))
    expect(pdfParse).toHaveBeenCalledWith(Buffer.from('any_file_buffer'))
  })

  it('should return parsed file content', async () => {
    const pdfParseMock = jest.fn().mockResolvedValue({
      text: 'Mocked PDF text data',
    })
    ;(pdfParse as jest.Mock).mockImplementation(pdfParseMock)

    const fileBuffer = Buffer.from('Mocked PDF file buffer')
    const result = await sut.parse(fileBuffer)

    expect(result).toBe('Mocked PDF text data')
  })

  it('should return an error message if parsing fails', async () => {
    const errorMessage = 'Mocked parsing error'
    const pdfParseMock = jest.fn().mockRejectedValue(new Error(errorMessage))
    ;(pdfParse as jest.Mock).mockImplementation(pdfParseMock)

    const fileBuffer = Buffer.from('Mocked PDF file buffer')
    const result = await sut.parse(fileBuffer)

    expect(result).toBe(errorMessage)
    expect(pdfParseMock).toHaveBeenCalledWith(fileBuffer)
  })
})
