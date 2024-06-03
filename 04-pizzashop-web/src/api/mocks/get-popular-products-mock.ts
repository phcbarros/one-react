import {http, HttpResponse} from 'msw'

import type {GetPopularProductsResponse} from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    {
      product: 'produto 1',
      amount: 2000,
    },
    {
      product: 'produto 2',
      amount: 1000,
    },
    {
      product: 'produto 3',
      amount: 200,
    },
    {
      product: 'produto 4',
      amount: 100,
    },
    {
      product: 'produto 5',
      amount: 300,
    },
    {
      product: 'produto 6',
      amount: 2000,
    },
    {
      product: 'produto 7',
      amount: 2000,
    },
  ])
})
