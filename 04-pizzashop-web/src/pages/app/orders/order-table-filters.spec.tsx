import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter} from 'react-router-dom'

import {OrderTableFilters} from './order-table-filters'

describe('Order Table Filters', () => {
  it('should set the query params correctly', async () => {
    const user = userEvent.setup()

    const wrapper = render(<OrderTableFilters />, {
      wrapper: ({children}) => {
        return (
          <MemoryRouter initialEntries={['/orders']}>{children}</MemoryRouter>
        )
      },
    })

    const orderIdElement = wrapper.getByTestId('order-id') as HTMLInputElement
    await user.type(orderIdElement, '1')

    const customerNameElement = wrapper.getByTestId(
      'customer-name',
    ) as HTMLInputElement
    await user.type(customerNameElement, 'xpto')

    // não foi possível testar o select
    // const selectElement = wrapper.getByRole('combobox') as HTMLInputElement // wrapper.getByTestId('status') as HTMLInputElement
    // selectElement.dataset.open = 'true'
    // // await user.click(selectElement)

    // const optionsElement = await wrapper.findByText('Pendente')
    // // await user.selectOptions(selectElement, 'all')

    // // wrapper.debug()

    const searchButtonElement = wrapper.getByRole('button', {
      name: 'Filtrar resultados',
    })
    await user.click(searchButtonElement)

    expect(location.search).toBe('?orderId=1&customerName=xpto&status=all')
    console.log(location.search)
  })
})
