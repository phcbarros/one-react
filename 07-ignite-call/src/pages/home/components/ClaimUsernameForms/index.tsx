import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Text, TextInput} from '@ignite-ui/react'
import {useRouter} from 'next/router'
import {ArrowRight} from 'phosphor-react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Form, FormAnnotation} from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'O usuário deve ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]*)$/i, {
      message: 'O usuário deve ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const {username} = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button disabled={isSubmitting}>
          Reservar usuário
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
