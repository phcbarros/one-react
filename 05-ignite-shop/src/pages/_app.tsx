import {globalStyles} from '@/styles/global'
import {Container, Header} from '@/styles/pages/app'
import type {AppProps} from 'next/app'
import logoImg from '../assets/ignite-shop-logo.svg'

globalStyles()

export default function App({Component, pageProps}: AppProps) {
  return (
    <Container>
      <Header>
        <img src={logoImg.src} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
