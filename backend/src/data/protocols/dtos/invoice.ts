export type FormattedEnergy = {
  kwh: number
  preco_unit: number
  valor: number
}

export type FormattedInvoice = {
  numero_cliente: string
  mes_ref_string: string
  mes_ref: number
  ano_ref: number
  data_vencimento: string
  energia_eletrica: FormattedEnergy
  energia_injetada: FormattedEnergy
  en_comp_sem_icms: FormattedEnergy
  contrib_ilum_publica: number
  valor_total: number
}
