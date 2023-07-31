export interface IFileManager {
  checkIfFolderExists(folderPath: string): boolean
  createFolder(folderPath: string): void
  createFile(filePath: string, fileContent: Buffer): void
}
