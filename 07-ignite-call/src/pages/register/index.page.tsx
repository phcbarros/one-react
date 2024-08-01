import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Heading, MultiStep, Text, TextInput} from '@ignite-ui/react'
import {useRouter} from 'next/router'
import {ArrowRight} from 'phosphor-react'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Container, Form, FormError, Header} from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'O usuário deve ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]*)$/i, {
      message: 'O usuário deve ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, {message: 'O nome deve ter pelo menos 3 letras.'}),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', String(router.query?.username))
    }
  }, [router.query?.username, setValue])

  function handleRegisterSubmit(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegisterSubmit)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome de completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
