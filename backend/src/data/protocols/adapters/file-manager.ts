export interface IFileManager {
  checkIfFileExists(fileName: string): boolean
  createFile(fileName: string, fileContent: Buffer): void
  getFilePath(fileName: string): string
}
