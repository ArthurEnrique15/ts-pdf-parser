import { IFileManager } from '../../../data/protocols/adapters/file-manager'
import { FileManager } from '../../../infra/adapters/file-manager'

export function makeFileManager(): IFileManager {
  return new FileManager()
}
