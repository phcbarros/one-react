import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Text, TextArea, TextInput} from '@ignite-ui/react'
import dayjs from 'dayjs'
import {CalendarBlank, Clock} from 'phosphor-react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {ConfirmForm, FormActions, FormError, FormHeader} from './styles'

const confirmFormSchema = z.object({
  name: z.string().min(3, {message: 'O nome deve ter pelo menos 3 letras.'}),
  email: z.string().email({message: 'Digite um e-mail válido.'}),
  observations: z.string().nullable(),
})

export type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: {isSubmitting, errors},
  } = useForm({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  const selectedDate = dayjs(schedulingDate)
  const describedDate = selectedDate.format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = selectedDate.format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar agendamento
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
