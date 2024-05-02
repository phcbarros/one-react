import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {api} from '../lib/axios'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionsContextType {
  transactions: Transaction[]
  loadTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsContextProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({
  children,
}: Readonly<TransactionsContextProviderProps>) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const loadTransactions = useCallback(async (query?: string) => {
    const response = await api.get<Transaction[]>('transactions', {
      params: {
        q: query,
      },
    })
    console.log(response.data)
    setTransactions(response.data)
  }, [])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  const values = useMemo(
    () => ({
      transactions,
      loadTransactions,
    }),
    [transactions, loadTransactions],
  )

  return (
    <TransactionsContext.Provider value={values}>
      {children}
    </TransactionsContext.Provider>
  )
}
