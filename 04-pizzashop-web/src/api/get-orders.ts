import {api} from '@/lib/axios'

interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const {data} = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    },
  })
  return data
}
