import {ImageContainer, SuccessContainer} from '@/styles/pages/success'
import Link from 'next/link'

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        {/* <Image src="/images/rocket.svg" alt="" width={120} height={120} /> */}
      </ImageContainer>

      <p>
        Uhull <strong>Paulo Barros</strong> sua <strong>Camiseta</strong> já
        está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}
