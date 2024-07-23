import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '@/styles/pages/product'
import {useRouter} from 'next/router'

export default function Product() {
  const {query} = useRouter()
  return (
    <ProductContainer>
      <ImageContainer>{/* <Image /> */}</ImageContainer>

      <ProductDetail>
        <h1>Camiseta X</h1>
        <span>R$ 59,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel harum
          dicta officia impedit repellat, voluptatem officiis quia voluptates
          quam vitae, et itaque vero praesentium ipsam quos sint. Quis, qui
          sequi.
        </p>

        <button>Comprar agora</button>
      </ProductDetail>
    </ProductContainer>
  )
}
