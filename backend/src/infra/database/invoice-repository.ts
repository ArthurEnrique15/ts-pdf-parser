import { PrismaClient } from '@prisma/client'
import { IAddInvoiceRepository } from '../../data/protocols/database/invoice/create'
import { FormattedInvoice } from '../../data/protocols/dtos/invoice'
import { InvoiceModel } from '../../domain/models/Invoice'
import { IFindAllInvoicesRepository } from '../../data/protocols/database/invoice/find-all'
import { IFindInvoiceByIdRepository } from '../../data/protocols/database/invoice/find-by-id'
import { IGetTotalValuePerMonthInvoiceRepository } from '../../data/protocols/database/invoice/get-total-value-per-month'
import { ValuePerMonth } from '../../domain/use-cases/get-total-value-per-month'

export class InvoiceRepository
  implements
    IAddInvoiceRepository,
    IFindAllInvoicesRepository,
    IFindInvoiceByIdRepository,
    IGetTotalValuePerMonthInvoiceRepository
{
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async add(invoiceData: FormattedInvoice): Promise<InvoiceModel> {
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

    return invoice
  }

  async findAll(): Promise<InvoiceModel[]> {
    const invoices = await this.prismaClient.invoice.findMany()
    return invoices
  }

  async findById(id: string): Promise<InvoiceModel> {
    const invoice = await this.prismaClient.invoice.findUnique({ where: { id } })
    return invoice
  }

  async getTotalValuePerMonth(): Promise<ValuePerMonth[]> {
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
