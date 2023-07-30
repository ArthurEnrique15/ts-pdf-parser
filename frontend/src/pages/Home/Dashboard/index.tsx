import { Card } from './Card'
import { DashboardContainer, NumbersContainer } from './styles'

export function Dashboard() {
  return (
    <DashboardContainer>
      <NumbersContainer>
        <Card
          energyType="generated"
          energyAmount={37427}
          percentageDiff={-27}
        />
        <Card energyType="consumed" energyAmount={37427} percentageDiff={-27} />
        <Card
          energyType="compensated"
          energyAmount={37427}
          percentageDiff={-27}
        />
      </NumbersContainer>
    </DashboardContainer>
  )
}
