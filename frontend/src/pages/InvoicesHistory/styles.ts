import styled from 'styled-components'

export const InvoicesHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding: 0 2rem;

  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;

  gap: 1.5rem;
`

export const YearButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;

  width: 100%;
`

type YearButtonProps = {
  selected: boolean
}

export const YearButton = styled.button<YearButtonProps>`
  background-color: ${({ theme }) => theme['base-post']};
  color: ${({ selected, theme }) => (selected ? theme.blue : theme.white)};
  border: ${({ selected, theme }) =>
    selected ? `1px solid ${theme.blue}` : '1px solid transparent'};

  border-radius: 6px;

  padding: 0.5rem;

  transition: 0.5s;

  &:hover {
    ${({ selected, theme }) => {
      if (!selected) {
        return `
          border-color: ${theme['base-span']}};
          color: ${theme['base-span']}};
        `
      }
    }}
  }
`

export const TableButton = styled.button`
  background-color: ${({ theme }) => theme['base-post']};
  color: ${(props) => props.theme['base-span']};

  padding: 0.5rem;

  border-radius: 6px;
  border: 1px solid ${(props) => props.theme['base-span']};

  transition: 0.5s;

  &:not(:disabled):hover {
    border-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.blue};
  }

  &:disabled {
    background-color: ${({ theme }) => theme['base-label']};
    opacity: 0.5;
  }
`
