export interface IFileManager {
  checkIfFileExists(filePath: string): boolean
  createFile(filePath: string, fileContent: Buffer): void
  getFilePath(filePath: string): string
}
