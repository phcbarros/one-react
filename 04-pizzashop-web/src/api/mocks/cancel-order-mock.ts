import {http, HttpResponse} from 'msw'

import type {CancelOrderParams} from '../cancel-order'

export const canceleOrderMock = http.patch<CancelOrderParams, never, never>(
  '/orders/:orderId/cancel',
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
