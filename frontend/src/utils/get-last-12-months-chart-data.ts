import { format, subMonths } from 'date-fns'
import { InvoiceChartData } from '../pages/Home/EnergyChart'
import { ptBR } from 'date-fns/locale'

export const getLast12MonthsChartData = (): InvoiceChartData[] => {
  const currentDate = new Date()
  const last12Months = []

  for (let i = 11; i >= 0; i--) {
    const previousMonth = subMonths(currentDate, i)
    const mes_ref = parseInt(format(previousMonth, 'M'), 10) // Parse month as a number
    const ano_ref = parseInt(format(previousMonth, 'yyyy'), 10) // Parse year as a number

    const monthName = format(previousMonth, 'LLL', {
      locale: ptBR,
    }).toUpperCase()
    const mes_ref_string = `${monthName}/${ano_ref}`

    last12Months.push({
      mes_ref,
      ano_ref,
      mes_ref_string,
      valor_total: 0,
    })
  }

  return last12Months
}
