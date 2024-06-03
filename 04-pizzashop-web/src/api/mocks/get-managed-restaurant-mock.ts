import {http, HttpResponse} from 'msw'

import type {GetManagedRestaurantResponse} from '../get-managed-restaurant'

export const getManageRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza Shop',
    description: 'Best pizza shop in town',
    managerId: 'custom-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})
