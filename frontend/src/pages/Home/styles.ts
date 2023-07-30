import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;

  width: 58rem;

  padding: 0 2rem;

  margin: auto;
  margin-bottom: 3rem;
`

export const PeriodContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  select {
    background-color: ${({ theme }) => theme['base-input']};
    color: ${({ theme }) => theme['base-text']};

    padding: 0.5rem;

    border-radius: 6px;
  }

  gap: 2rem;
`

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
`

export const NumbersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`
