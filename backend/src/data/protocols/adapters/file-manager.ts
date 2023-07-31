export interface IFileManager {
  checkIfFolderExists(folderPath: string): boolean
  checkIfFileExists(filePath: string): boolean
  createFolder(folderPath: string): void
  createFile(filePath: string, fileContent: Buffer): void
  getFilePath(filePath: string): string
}
