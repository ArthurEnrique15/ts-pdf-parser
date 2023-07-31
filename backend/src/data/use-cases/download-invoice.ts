export interface IDownloadInvoice {
  download(id: string): Promise<string>
}
