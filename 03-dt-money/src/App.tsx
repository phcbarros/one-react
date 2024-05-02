import {ThemeProvider} from 'styled-components'
import {TransactionsContextProvider} from './contexts/TransactionsContext'
import {Transactions} from './pages/Transactions'
import {GlobalStyle} from './styles/global'
import {defaultTheme} from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsContextProvider>
        <Transactions />
      </TransactionsContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
