import {stripe} from '@/lib/stripe'
import {ImageContainer, SuccessContainer} from '@/styles/pages/success'
import {GetServerSideProps} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({customerName, product}: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={120} height={120} />
      </ImageContainer>

      <p>
        Uhull <strong>{customerName}</strong> sua{' '}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if (!query.session_id) {
    return {redirect: {destination: '/', permanent: false}}
  }

  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session!.customer_details!.name
  const products = session!.line_items!.data[0].price!.product as Stripe.Product

  return {
    props: {
      product: {
        name: products.name,
        imageUrl: products.images[0],
      },
      customerName,
    },
  }
}
