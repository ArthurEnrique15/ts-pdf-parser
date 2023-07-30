import { HeaderContainer, StyledLink } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <span>Dashboard</span>
      </StyledLink>
      <StyledLink to="/history">
        <span>Histórico</span>
      </StyledLink>
      <StyledLink to="/upload">
        <span>Upload</span>
      </StyledLink>
    </HeaderContainer>
  )
}
