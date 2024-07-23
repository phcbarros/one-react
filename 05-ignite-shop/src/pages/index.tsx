import {HomeContainer, Product} from '@/styles/pages/home'
import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react'
import {GetServerSideProps} from 'next'
import Image from 'next/image'
import {stripe} from '../lib/stripe'

import Stripe from 'stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

// importante informar a altura e a largura da imagem
export default function Home({products}: Readonly<HomeProps>) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

// usuário não tem acesso ao código dentro de getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: price.unit_amount ? price.unit_amount / 100 : 0,
    }
  })
  console.log(response.data)

  return {
    props: {
      products,
    },
  }
}
