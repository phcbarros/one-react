import {api} from '@/lib/axios'

type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const {data} = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )
  return data
}
