import {Button, Text, TextArea, TextInput} from '@ignite-ui/react'
import {CalendarBlank, Clock} from 'phosphor-react'
import {ConfirmForm, FormActions, FormHeader} from './styles'

export function ConfirmStep() {
  return (
    <ConfirmForm as="form" onSubmit={() => {}}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          24 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          08:00
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" />
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar agendamento</Button>
      </FormActions>
    </ConfirmForm>
  )
}
