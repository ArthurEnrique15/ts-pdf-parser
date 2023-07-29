import { Invoice, PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import PdfParser from '../helpers/pdf-parser'
import InvoiceFormatter from '../helpers/invoice-formatter'

class InvoiceService {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async create(buffer: Buffer): Promise<Invoice> {
    const text = await PdfParser.parse(buffer)

    const invoiceData = InvoiceFormatter.format(text)

    const {
      numero_cliente,
      mes_ref,
      data_vencimento,
      energia_eletrica,
      energia_injetada,
      en_comp_sem_icms,
      contrib_ilum_publica,
      valor_total,
    } = invoiceData

    const invoice = await this.prismaClient.invoice.create({
      data: {
        numero_cliente,
        mes_ref,
        data_vencimento: new Date(data_vencimento),
        energia_eletrica_kwh: energia_eletrica.kwh,
        energia_eletrica_preco_unit: energia_eletrica.preco_unit,
        energia_eletrica_valor: energia_eletrica.valor,
        energia_injetada_kwh: energia_injetada.kwh,
        energia_injetada_preco_unit: energia_injetada.preco_unit,
        energia_injetada_valor: energia_injetada.valor,
        en_comp_sem_icms_kwh: en_comp_sem_icms.kwh,
        en_comp_sem_icms_preco_unit: en_comp_sem_icms.preco_unit,
        en_comp_sem_icms_valor: en_comp_sem_icms.valor,
        contrib_ilum_publica,
        valor_total,
      },
    })

    fs.appendFileSync(path.join(__dirname, `../tmp/${invoice.id}.pdf`), buffer)

    return invoice
  }

  async findAll(): Promise<Invoice[]> {
    const invoices = await this.prismaClient.invoice.findMany()

    return invoices
  }
}

export default new InvoiceService()
