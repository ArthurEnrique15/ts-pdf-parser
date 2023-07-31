export type ValuePerMonth = {
  mes_ref: number
  ano_ref: number
  mes_ref_string: string
  valor_total: number
}
export interface IGetTotalValuePerMonth {
  getTotalValuePerMonth(): Promise<ValuePerMonth[]>
}
