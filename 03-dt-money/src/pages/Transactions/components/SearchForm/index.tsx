import {zodResolver} from '@hookform/resolvers/zod'
import {MagnifyingGlass} from 'phosphor-react'
import {useForm} from 'react-hook-form'
import {useContextSelector} from 'use-context-selector'
import * as z from 'zod'
import {TransactionsContext} from '../../../../contexts/TransactionsContext'
import {SearchFormContainer} from './styles'

/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer)
 * - Props changed (mudou propriedades)
 * - Parent rerendered (componente pai renderizou)
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1 Comparar a versão anterior dos hooks e props
 * 0.2 Se algo mudou, ele vai permitir que o React reescreva o HTML na tela
 */

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

//export const SearchForm = memo(SearchFormComponent)
