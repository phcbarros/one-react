import {prisma} from '@/lib/prisma'
import {Avatar, Heading, Text} from '@ignite-ui/react'
import {GetStaticPaths, GetStaticProps} from 'next'
import {ScheduleForm} from './schedule-form'
import {Container, UserHeader} from './styles'

const ONE_DAY_IN_SECONDS = 60 * 60 * 24 // 1 dia

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({user}: Readonly<ScheduleProps>) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Heading size="md">{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // true,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: ONE_DAY_IN_SECONDS,
  }
}
