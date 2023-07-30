import { useLocation } from 'react-router-dom'
import { HeaderContainer, StyledLink } from './styles'

export function Header() {
  const location = useLocation()

  const path = location.pathname

  return (
    <HeaderContainer>
      <StyledLink active={path === '/'} to="/">
        <span>Dashboard</span>
      </StyledLink>
      <StyledLink active={path === '/history'} to="/history">
        <span>Histórico</span>
      </StyledLink>
      <StyledLink active={path === '/upload'} to="/upload">
        <span>Upload</span>
      </StyledLink>
    </HeaderContainer>
  )
}
