import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'
import { InvoicesProvider } from './contexts/InvoicesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <InvoicesProvider>
          <Router />
        </InvoicesProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
