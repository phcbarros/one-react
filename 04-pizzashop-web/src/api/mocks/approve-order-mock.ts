import {http, HttpResponse} from 'msw'

import type {ApproveOrderParams} from '../approve-order'

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  '/orders/:orderId/approve',
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
