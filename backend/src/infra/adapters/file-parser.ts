import { IFileParser } from '../../data/protocols/adapters/file-parser'

import pdfParse from 'pdf-parse'

export class FileParser implements IFileParser {
  async parse(fileBuffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(fileBuffer)
      return data.text
    } catch (err) {
      return err.message
    }
  }
}
