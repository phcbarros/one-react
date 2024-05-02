import {useCallback, useEffect, useState} from 'react'
import {Header} from '../../components/Header'
import {Summary} from '../../components/Summary'
import {SearchForm} from './components/SearchForm'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const loadTransactions = useCallback(async () => {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()
    setTransactions(data)
  }, [])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
