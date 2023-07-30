import { DataGrid } from '@mui/x-data-grid'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
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

export const TableContainer = styled.div`
  color: ${(props) => props.theme['base-span']};
`

export const StyledDataGrid = styled(DataGrid)`
  color: ${(props) => props.theme['base-span']};
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.5rem;

  padding: 2rem;

  width: 100%;

  background-color: ${({ theme }) => theme['base-post']};
  color: white;

  border-radius: 10px;

  margin-top: -5.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;
  }
`

export const TitleHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  color: ${({ theme }) => theme.blue};

  text-transform: uppercase;

  font-weight: 700;
  font-size: 0.75rem;
  line-height: 160%;

  border-bottom: 1px solid transparent;

  a:focus,
  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none;
    color: ${({ theme }) => theme.blue};
  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${({ theme }) => theme.blue};
  }
`

export const TitleHeaderLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  border-bottom: 1px solid transparent;

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    border-color: ${({ theme }) => theme.blue};
  }

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`

export const TitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  min-height: 2rem;

  margin-top: 0.75rem;

  line-height: 160%;

  span {
    font-weight: 700;
    font-size: 1.5rem;

    color: ${({ theme }) => theme['base-title']};
  }

  @media (max-width: 768px) {
    height: auto;
  }
`

export const TitleFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 2rem;

  width: 100%;

  line-height: 160%;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
  }

  svg {
    color: ${({ theme }) => theme['base-label']};
  }

  span,
  time {
    color: ${({ theme }) => theme['base-span']};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`

export const StyledReactMarkdown = styled(ReactMarkdown)`
  color: ${({ theme }) => theme['base-text']};

  line-height: 160%;

  h1 {
    margin-bottom: 1rem;
    line-height: 160%;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  li {
    margin-left: 1.5rem;
  }

  a {
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
      color: ${({ theme }) => theme.blue};
    }
  }

  ul {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  code {
    font-size: 0.75rem;
    padding: 0.25rem;

    border-radius: 6px;

    background-color: ${({ theme }) => theme['base-post']};
  }

  pre {
    border-radius: 6px;
    padding: 1rem;
    background-color: ${({ theme }) => theme['base-post']};

    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
  }
`
