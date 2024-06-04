import {http, HttpResponse} from 'msw'

import type {DeliveryOrderParams} from '../deliver-order'

export const deliverOrderMock = http.patch<DeliveryOrderParams, never, never>(
  '/orders/:orderId/deliver',
  ({params}) => {
    const {orderId} = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, {
        status: 400,
      })
    }

    return new HttpResponse(null, {
      status: 204,
    })
  },
)
