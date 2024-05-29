import {render} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import {NavLink} from './nav-link'

describe('Nav Link', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({children}) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    expect(wrapper.getByText('About').dataset.current).toBe('true')
    expect(wrapper.getByText('Home').dataset.current).toBe('false')
  })
})
