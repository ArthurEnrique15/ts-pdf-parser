import { Invoice, PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import PdfParser from '../helpers/pdf-parser'
import InvoiceFormatter from '../helpers/invoice-formatter'

type AmountPerMonth = {
  mes_ref: number
  ano_ref: number
  mes_ref_string: string
  valor_total: number
}

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
      mes_ref_string,
      mes_ref,
      ano_ref,
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
        mes_ref_string,
        mes_ref,
        ano_ref,
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

    if (!fs.existsSync(path.join(__dirname, '../tmp'))) {
      fs.mkdirSync(path.join(__dirname, '../tmp'))
    }

    fs.appendFileSync(path.join(__dirname, `../tmp/${invoice.id}.pdf`), buffer)

    return invoice
  }

  async findAll(): Promise<Invoice[]> {
    const invoices = await this.prismaClient.invoice.findMany()

    return invoices
  }

  async downloadFile(id: string): Promise<string | null> {
    const invoice = await this.prismaClient.invoice.findUnique({ where: { id } })

    if (!invoice) {
      throw new Error('Nota fiscal não encontrada.')
    }

    try {
      fs.accessSync(path.join(__dirname, `../tmp/${invoice.id}.pdf`))
      return path.join(__dirname, `../tmp/${invoice.id}.pdf`)
    } catch (err) {
      return null
    }
  }

  async getAmountPerMonth(): Promise<AmountPerMonth[]> {
    const result = await this.prismaClient.invoice.groupBy({
      by: ['mes_ref_string', 'mes_ref', 'ano_ref'],
      _sum: { valor_total: true },
    })

    const formattedResult = result.map((item) => {
      return {
        mes_ref: item.mes_ref,
        ano_ref: item.ano_ref,
        mes_ref_string: item.mes_ref_string,
        valor_total: item._sum.valor_total,
      }
    })

    return formattedResult
  }
}

export default new InvoiceService()
