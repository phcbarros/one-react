import {http, HttpResponse} from 'msw'

import type {GetProfileResponse} from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'joedoe@example.com',
      phone: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  },
)
