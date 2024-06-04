import {api} from '../lib/axios'

export interface DeliveryOrderParams {
  orderId: string
}

export async function deliveryOrder({orderId}: DeliveryOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`)
}
