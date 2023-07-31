export interface IFileParser {
  parse(fileBuffer: Buffer): Promise<string>
}
