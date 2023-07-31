import { IFileParser } from '../../../data/protocols/adapters/file-parser'
import { FileParser } from '../../../infra/adapters/file-parser'

export function makeFileParser(): IFileParser {
  return new FileParser()
}
