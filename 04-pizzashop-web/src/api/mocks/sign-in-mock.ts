import {http, HttpResponse} from 'msw'

import type {SignInBody} from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({request}) => {
    const {email} = await request.json()

    if (email === 'joedoe@example.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookies': 'auth=sample-jwt',
        },
      })
    }

    return new HttpResponse(null, {
      status: 401,
    })
  },
)
