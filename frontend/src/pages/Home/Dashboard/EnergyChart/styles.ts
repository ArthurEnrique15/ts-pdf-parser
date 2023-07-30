import styled from 'styled-components'

export const EnergyChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 2rem;

  margin-top: 2rem;

  h1 {
    color: ${({ theme }) => theme['base-span']};
  }
`
