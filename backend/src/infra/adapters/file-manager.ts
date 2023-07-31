import { IFileManager } from '../../data/protocols/adapters/file-manager'
import fs from 'fs'
import path from 'path'

export class FileManager implements IFileManager {
  checkIfFolderExists(folderPath: string): boolean {
    return fs.existsSync(path.join(__dirname, folderPath))
  }

  createFolder(folderPath: string): void {
    fs.mkdirSync(path.join(__dirname, folderPath))
  }

  createFile(filePath: string, fileContent: Buffer): void {
    fs.appendFileSync(path.join(__dirname, filePath), fileContent)
  }
}
