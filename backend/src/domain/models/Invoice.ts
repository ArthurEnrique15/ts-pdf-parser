export type InvoiceModel = {
  id: string
  numero_cliente: string
  mes_ref_string: string
  mes_ref: number
  ano_ref: number
  data_vencimento: Date
  energia_eletrica_kwh: number
  energia_eletrica_preco_unit: number
  energia_eletrica_valor: number
  energia_injetada_kwh: number
  energia_injetada_preco_unit: number
  energia_injetada_valor: number
  en_comp_sem_icms_kwh: number
  en_comp_sem_icms_preco_unit: number
  en_comp_sem_icms_valor: number
  contrib_ilum_publica: number
  valor_total: number
  created_at: Date
}
