import {zodResolver} from '@hookform/resolvers/zod'
import {MagnifyingGlass} from 'phosphor-react'
import {useForm} from 'react-hook-form'
import {useContextSelector} from 'use-context-selector'
import * as z from 'zod'
import {TransactionsContext} from '../../../../contexts/TransactionsContext'
import {SearchFormContainer} from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const loadTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.loadTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    loadTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size="20" />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
