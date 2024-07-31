import {Button, TextInput} from '@ignite-ui/react'
import {ArrowRight} from 'phosphor-react'
import {Form} from './styles'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuário" />
      <Button>
        Reservar usuário
        <ArrowRight />
      </Button>
    </Form>
  )
}
