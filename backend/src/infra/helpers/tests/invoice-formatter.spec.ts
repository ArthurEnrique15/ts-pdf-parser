import { InvoiceFormatter } from '../invoice-formatter'

describe('InvoiceFormatter', () => {
  const sut = new InvoiceFormatter()

  it('should return correct invoice data', () => {
    const input = `Nº DO CLIENTE                      Nº DA INSTALAÇÃO
    7202788969        3004298116
           Referente a                                Vencimento                       Valor a pagar (R$)
      JAN/2023               06/02/2023`

    const result = sut.format(input)

    expect(result).toMatchObject({
      numero_cliente: '7202788969',
      mes_ref_string: 'JAN/2023',
      data_vencimento: '06/02/2023',
      mes_ref: 1,
      ano_ref: 2023,
    })
  })

  it('should return correct energy data', () => {
    const input = `Energia ElétricakWh     100  0,74860466        74,84 0,65313000 
    Energia injetada HFPkWh     954  0,65313000      -623,08 0,65313000 
    En comp. s/ ICMSkWh     954  0,68383415       652,36 0,65313000 
    Contrib Ilum Publica Municipal         35,92
    TOTAL        140,04`

    const result = sut.format(input)

    expect(result).toMatchObject({
      energia_eletrica: { kwh: 100, preco_unit: 0.74860466, valor: 74.84 },
      energia_injetada: { kwh: 954, preco_unit: 0.65313, valor: -623.08 },
      en_comp_sem_icms: { kwh: 954, preco_unit: 0.68383415, valor: 652.36 },
      contrib_ilum_publica: 35.92,
      valor_total: 140.04,
    })
  })

  it('should return correct data when input is empty', () => {
    const result = sut.format('')

    expect(result).toEqual({
      numero_cliente: '',
      mes_ref_string: '',
      data_vencimento: '',
      mes_ref: 0,
      ano_ref: 0,
      energia_eletrica: { kwh: 0, preco_unit: 0, valor: 0 },
      energia_injetada: { kwh: 0, preco_unit: 0, valor: 0 },
      en_comp_sem_icms: { kwh: 0, preco_unit: 0, valor: 0 },
      contrib_ilum_publica: 0,
      valor_total: 0,
    })
  })

  it('should return month and year as 0 when date is invalid', () => {
    const input = `Nº DO CLIENTE                      Nº DA INSTALAÇÃO
    7202788969        3004298116
           Referente a                                Vencimento                       Valor a pagar (R$)
      AAA/2023               06/02/2023`

    const result = sut.format(input)

    expect(result).toMatchObject({ mes_ref: 0, ano_ref: 0 })
  })
})
