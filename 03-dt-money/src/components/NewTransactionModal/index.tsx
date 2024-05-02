import {zodResolver} from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import {ArrowCircleDown, ArrowCircleUp, X} from 'phosphor-react'
import {Controller, useForm} from 'react-hook-form'
import * as z from 'zod'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  /**
   * Para componentes não padrões do HTML é necessário usar a abordagem de componentes controlados (controlled components)
   * Nesse caso é necessário usar o control e o componente Controller do React Hook Form
   * A propriedade field contém todas as informações do input e onChange contém a função de atualização e value
   */

  const {
    control,
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<NewTransactionFormInputs>({
    defaultValues: {
      type: 'income',
    },
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', {valueAsNumber: true})}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({field}) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}>
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
