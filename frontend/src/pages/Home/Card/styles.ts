import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  border: 1px solid ${({ theme }) => theme['base-span']};
  border-radius: 6px;

  color: ${({ theme }) => theme['base-text']};

  background-color: ${({ theme }) => theme['base-post']};

  width: 20rem;
  /* height: 10rem; */
`

export const CardIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  background-color: ${({ theme }) => theme['base-input']};

  border-radius: 999px;
`

export const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  gap: 0.75rem;
`

export const EnergyAmountSpan = styled.span`
  font-size: 2rem;
  font-weight: 700;
`
