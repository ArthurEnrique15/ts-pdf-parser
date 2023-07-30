import { Lightning, PlugCharging, Tree } from '@phosphor-icons/react'
import {
  CardContainer,
  CardIconContainer,
  CardTextContainer,
  EnergyAmountSpan,
} from './styles'
import { useContext } from 'react'
import { InvoicesContext } from '../../../contexts/InvoicesContext'

type CardProps = {
  energyType: 'generated' | 'consumed' | 'compensated'
  selectedMonth: number
  selectedYear: number
}

export function Card({ energyType, selectedMonth, selectedYear }: CardProps) {
  const { invoices } = useContext(InvoicesContext)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.mes_ref === selectedMonth && invoice.ano_ref === selectedYear,
  )

  const getCardData = () => {
    switch (energyType) {
      case 'generated':
        return {
          title: 'Energia Gerada',
          icon: <Lightning size={32} />,
          energyAmount: filteredInvoices.reduce(
            (acc, invoice) => acc + invoice.energia_injetada_kwh,
            0,
          ),
        }
      case 'consumed':
        return {
          title: 'Energia Consumida',
          icon: <PlugCharging size={32} />,
          energyAmount: filteredInvoices.reduce(
            (acc, invoice) => acc + invoice.energia_eletrica_kwh,
            0,
          ),
        }
      case 'compensated':
        return {
          title: 'Energia Compensada',
          icon: <Tree size={32} />,
          energyAmount: filteredInvoices.reduce(
            (acc, invoice) => acc + invoice.en_comp_sem_icms_kwh,
            0,
          ),
        }
    }
  }

  const cardData = getCardData()

  return (
    <CardContainer>
      <CardIconContainer>{cardData.icon}</CardIconContainer>
      <CardTextContainer>
        <span>{cardData.title}</span>
        <p>
          <EnergyAmountSpan>{cardData.energyAmount}</EnergyAmountSpan>
          <span>kWh</span>
        </p>
      </CardTextContainer>
    </CardContainer>
  )
}
