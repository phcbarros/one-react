import {http, HttpResponse} from 'msw'

import type {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async ({params}) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
    },
    totalInCents: 3000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        quantity: 1,
        product: {
          name: 'Pizza Marguerita',
        },
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        quantity: 2,
        product: {
          name: 'Pizza Pepperoni',
        },
      },
    ],
  })
})
