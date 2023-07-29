import pdfParse from 'pdf-parse'

class PdfParser {
  async parse(fileBuffer: Buffer) {
    try {
      const data = await pdfParse(fileBuffer)
      return data.text
    } catch (err) {
      return err.message
    }
  }
}

export default new PdfParser()
