import { useCallback, useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../../../lib/axios'
import { EnergyChartContainer } from './styles'
import { getLast12MonthsChartData } from '../../../utils/get-last-12-months-chart-data'

export type InvoiceChartData = {
  mes_ref: number
  ano_ref: number
  mes_ref_string: string
  valor_total: number
}

export function EnergyChart() {
  const [chartData, setChartData] = useState<InvoiceChartData[]>([])

  const fetchChartData = useCallback(async () => {
    const response = await api.get(`http://localhost:3333/energy-per-month`)

    if (response.status === 200) {
      const formattedChartData = formatChartData(response.data)
      setChartData(formattedChartData)
    }
  }, [])

  useEffect(() => {
    fetchChartData()
  }, [fetchChartData])

  function formatChartData(
    invoiceChartData: InvoiceChartData[],
  ): InvoiceChartData[] {
    const emptyChartData = getLast12MonthsChartData()

    const filledData = emptyChartData.map((data) => {
      const invoiceData = invoiceChartData.find(
        (invoice) =>
          invoice.mes_ref === data.mes_ref && invoice.ano_ref === data.ano_ref,
      )

      if (invoiceData) {
        return {
          ...data,
          valor_total: invoiceData.valor_total,
        }
      }

      return data
    })

    return filledData
  }

  return (
    <EnergyChartContainer>
      <h1>Valor total (R$) por mês</h1>
      <AreaChart
        width={1000}
        height={400}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="valorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3294F8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3294F8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis fontSize={12} dataKey="mes_ref_string" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="valor_total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#valorGradient)"
        />
      </AreaChart>
    </EnergyChartContainer>
  )
}
