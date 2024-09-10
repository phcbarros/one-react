import {api} from '@/lib/axios'
import {buildNextAuthOptions} from '@/pages/api/auth/[...nextauth].api'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import {GetServerSideProps} from 'next'
import {getServerSession} from 'next-auth'
import {useSession} from 'next-auth/react'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import {ArrowRight} from 'phosphor-react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Container, Header} from '../styles'
import {FormAnnotation, ProfileBox} from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const session = useSession()
  const router = useRouter()

  if (session.status !== 'authenticated') {
    return null
  }

  async function handleUpdateProfileSubmit(data: UpdateProfileFormData) {
    try {
      await api.put('/users/profile', {
        bio: data.bio,
      })

      await router.push(`/schedule/${session.data?.user.username}`)
    } catch (err) {
      // alert('Erro ao atualizar a bio!!!')
    }
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox
          as="form"
          onSubmit={handleSubmit(handleUpdateProfileSubmit)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
              referrerPolicy="no-referrer"
            />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />

            <FormAnnotation size="sm">
              Fale um pouco sobre você. Esse será exibido na sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
