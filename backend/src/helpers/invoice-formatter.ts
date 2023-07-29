type Energy = {
  kwh: number
  preco_unit: number
  valor: number
}

type Invoice = {
  numero_cliente: string
  mes_ref: string
  data_vencimento: string
  energia_eletrica: Energy
  energia_injetada: Energy
  en_comp_sem_icms: Energy
  contrib_ilum_publica: number
  valor_total: number
}

type MatchInvoiceResponse = { numero_cliente: string; mes_ref: string; data_vencimento: string }

type MatchEnergiesResponse = {
  energia_eletrica: Invoice['energia_eletrica']
  energia_injetada: Invoice['energia_injetada']
  en_comp_sem_icms: Invoice['en_comp_sem_icms']
}

class InvoiceFormatter {
  format(input: string): Invoice {
    // console.log(input)

    const invoiceMatch = this.matchInvoice(input)
    const energiesMatches = this.matchEnergies(input)

    const invoice: Invoice = {
      ...invoiceMatch,
      ...energiesMatches,
      contrib_ilum_publica: this.matchContribIlumPublica(input),
      valor_total: this.matchValorTotal(input),
    }

    console.log(invoice)

    return invoice
  }

  private matchInvoice(input: string): MatchInvoiceResponse {
    const invoiceRegex =
      /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)\s+Referente a\s+Vencimento\s+Valor a pagar \(R\$\)\s+([A-Za-z]{3}\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})/

    const invoiceMatch = input.match(invoiceRegex)

    if (!invoiceMatch) {
      return {
        numero_cliente: '',
        mes_ref: '',
        data_vencimento: '',
      }
    }

    return {
      numero_cliente: invoiceMatch[1],
      mes_ref: invoiceMatch[3],
      data_vencimento: invoiceMatch[4],
    }
  }

  private matchEnergies(input: string): MatchEnergiesResponse {
    const energyRegex = /Energia ElétricakWh\s+(\d+)\s+([\d,.]+)\s+([\d,.]+)/
    const energyInjetadaRegex = /Energia injetada HFPkWh\s+([\d.]+)\s+([\d,.]+)\s+([\d,-.]+)/
    const enCompSemIcmsRegex = /En comp. s\/ ICMSkWh\s+([\d,.]+)\s+([\d,.]+)\s+([\d,.]+)/

    return {
      energia_eletrica: this.matchEnergy(input, energyRegex),
      energia_injetada: this.matchEnergy(input, energyInjetadaRegex),
      en_comp_sem_icms: this.matchEnergy(input, enCompSemIcmsRegex),
    }
  }

  private matchEnergy(input: string, regex: RegExp): Energy {
    const energyMatch = input.match(regex)
    // console.log(energyMatch)

    if (!energyMatch) {
      return { kwh: 0, preco_unit: 0, valor: 0 }
    }

    return {
      kwh: parseInt(energyMatch[1].replace('.', '').replace(',', '.')),
      preco_unit: parseFloat(energyMatch[2].replace('.', '').replace(',', '.')),
      valor: parseFloat(energyMatch[3].replace('.', '').replace(',', '.')),
    }
  }

  private matchContribIlumPublica(input: string): number {
    const contribIlumPublicaRegex = /Contrib Ilum Publica Municipal\s+([\d,.]+)/

    const contribIlumPublicaMatch = input.match(contribIlumPublicaRegex)

    if (!contribIlumPublicaMatch) {
      return 0
    }

    return parseFloat(contribIlumPublicaMatch[1].replace(',', '.'))
  }

  private matchValorTotal(input: string): number {
    const valorTotalRegex = /TOTAL\s+([\d,.]+)/

    const valorTotalMatch = input.match(valorTotalRegex)

    if (!valorTotalMatch) {
      return 0
    }

    return parseFloat(valorTotalMatch[1].replace(',', '.'))
  }
}

export default new InvoiceFormatter()