import { PrismaClient } from '@prisma/client'
import { IAddInvoiceRepository } from '../../data/protocols/database/invoice/create'
import { FormattedInvoice } from '../../data/protocols/dtos/invoice'
import { InvoiceModel } from '../../domain/models/Invoice'

export class InvoiceRepository implements IAddInvoiceRepository {
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
}
