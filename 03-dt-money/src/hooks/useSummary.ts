import {useContext} from 'react'
import {TransactionsContext} from '../contexts/TransactionsContext'

export function useSummary() {
  const {transactions} = useContext(TransactionsContext)

  /**
   * Nenhum outro lugar a aplicação precisa da informação do total de entradas, saídas e  total
   * */
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {income: 0, outcome: 0, total: 0},
  )

  return summary
}
