import { IFileManager } from '../../data/protocols/adapters/file-manager'
import fs from 'fs'
import path from 'path'

export class FileManager implements IFileManager {
  checkIfFileExists(fileName: string): boolean {
    const filePath = path.join(__dirname, `../../tmp/${fileName}.pdf`)
    try {
      fs.accessSync(path.join(__dirname, filePath))
      return true
    } catch (error) {
      return false
    }
  }

  createFile(fileName: string, fileContent: Buffer): void {
    const tmpFolderPath = path.join(__dirname, '../../tmp')

    const tmpFolderExists = this.checkIfFolderExists(tmpFolderPath)

    if (!tmpFolderExists) {
      this.createFolder(tmpFolderPath)
    }

    const filePath = path.join(__dirname, `../../tmp/${fileName}.pdf`)
    fs.appendFileSync(filePath, fileContent)
  }

  private checkIfFolderExists(folderPath: string): boolean {
    return fs.existsSync(folderPath)
  }

  private createFolder(folderPath: string): void {
    fs.mkdirSync(folderPath)
  }

  getFilePath(fileName: string): string {
    return path.join(__dirname, `../../tmp/${fileName}.pdf`)
  }
}
