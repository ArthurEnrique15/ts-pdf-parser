import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 0 2rem;
  padding-top: 0.5rem;

  height: 4rem;

  background-color: ${(props) => props.theme['base-input']};

  gap: 1rem;

  margin-bottom: 2rem;
`

type StyledLinkProps = {
  active: boolean
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  height: 100%;

  color: ${({ active, theme }) => (active ? theme.blue : theme.white)};
  border-bottom: ${({ active, theme }) =>
    active ? `1px solid ${theme.blue}` : '1px solid transparent'};

  transition: 0.5s;

  &:hover {
    border-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.blue};
  }
`
