import {stripe} from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '@/styles/pages/product'
import axios from 'axios'
import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({product}: ProductProps) {
  // const {isFallback} = useRouter()

  // if (isFallback) {
  //   return <p>Loading...</p>
  // }

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const {checkoutUrl} = response.data

      //router.push(checkout) caso seja uma url interna da aplicação

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar ao checkout')
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetail>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}>
            Comprar agora
          </button>
        </ProductDetail>
      </ProductContainer>
    </>
  )
}

/**
 * SSR ou SSG
 * Os dados que vou carregar são atemporais? Sim
 * Os dados que vou carregar dependem de algum contexto de execução da página? Exemplo: cookies, dados do usuário, contexto atual, etc - Não
 * R: SSG se não então SSR
 */

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params: {id: 'prod_QWlXj7bIbsCjce'}}],
    fallback: 'blocking', //true,
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({
  params,
}) => {
  const productId = params?.id
  const product = await stripe.products.retrieve(productId!, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
