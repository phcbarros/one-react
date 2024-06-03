import {QueryClientProvider} from '@tanstack/react-query'
import {render} from '@testing-library/react'
import {HelmetProvider} from 'react-helmet-async'
import {MemoryRouter} from 'react-router-dom'

import {queryClient} from '@/lib/react-query'

import {SignIn} from './sign-in'

describe('Sign In', () => {
  it('should set default email input value if emails is present on search params', () => {
    const wrapper = render(
      <>
        <SignIn />
      </>,
      {
        wrapper: ({children}) => {
          return (
            <HelmetProvider>
              <MemoryRouter
                initialEntries={['/sign-in?email=xpto@example.com']}>
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </MemoryRouter>
            </HelmetProvider>
          )
        },
      },
    )

    const emailInput = wrapper.getByLabelText('Seu email') as HTMLInputElement

    // console.log(emailInput.outerHTML)
    expect(emailInput.value).toBe('xpto@example.com')
  })
})
