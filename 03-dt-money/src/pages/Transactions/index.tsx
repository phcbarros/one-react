import {Header} from '../../components/Header'
import {Summary} from '../../components/Summary'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighLight variant="income">R$ 3000,00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>13/04/2023</td>
            </tr>
            <tr>
              <td width="50%">Hotdog</td>
              <td>
                <PriceHighLight variant="outcome">-R$ 50,00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>12/04/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
