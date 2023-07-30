import { Lightning, PlugCharging, Tree, TrendUp } from '@phosphor-icons/react'
import {
  CardContainer,
  CardIconContainer,
  CardContent,
  FooterCard,
  CardTextContainer,
  EnergyAmountSpan,
} from './styles'

type CardProps = {
  energyType: 'generated' | 'consumed' | 'compensated'
  energyAmount: number
  percentageDiff: number
}

export function Card({ energyType, energyAmount, percentageDiff }: CardProps) {
  const getCardData = () => {
    switch (energyType) {
      case 'generated':
        return {
          title: 'Energia Gerada',
          icon: <Lightning size={32} />,
        }
      case 'consumed':
        return {
          title: 'Energia Consumida',
          icon: <PlugCharging size={32} />,
        }
      case 'compensated':
        return {
          title: 'Energia Compensada',
          icon: <Tree size={32} />,
        }
    }
  }

  const cardData = getCardData()

  return (
    <CardContainer>
      <CardContent>
        <CardIconContainer>{cardData.icon}</CardIconContainer>
        <CardTextContainer>
          <span>{cardData.title}</span>
          <p>
            <EnergyAmountSpan>{energyAmount}</EnergyAmountSpan>
            <span>kWh</span>
          </p>
        </CardTextContainer>
      </CardContent>

      <FooterCard>
        <TrendUp size={28} />
        <span>{percentageDiff}% em relação ao mês anterior</span>
      </FooterCard>
    </CardContainer>
  )
}
