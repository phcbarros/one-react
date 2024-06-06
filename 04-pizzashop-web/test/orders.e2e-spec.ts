import {expect, test} from 'playwright/test'

test('list orders', async ({page}) => {
  await page.goto('/orders', {waitUntil: 'networkidle'})

  expect(
    page.getByRole('cell', {name: 'Customer 1', exact: true}),
  ).toBeVisible()
  expect(page.getByRole('cell', {name: 'Customer 10'})).toBeVisible()
})

test('paginate orders', async ({page}) => {
  await page.goto('/orders', {waitUntil: 'networkidle'})

  // próxima página
  await page.getByRole('button', {name: 'Próxima página'}).click()

  expect(
    page.getByRole('cell', {name: 'Customer 11', exact: true}),
  ).toBeVisible()
  expect(page.getByRole('cell', {name: 'Customer 20'})).toBeVisible()

  // última página
  await page.getByRole('button', {name: 'Última página'}).click()

  expect(
    page.getByRole('cell', {name: 'Customer 51', exact: true}),
  ).toBeVisible()
  expect(page.getByRole('cell', {name: 'Customer 60'})).toBeVisible()

  // página anterior
  await page.getByRole('button', {name: 'Página anterior'}).click()

  expect(
    page.getByRole('cell', {name: 'Customer 41', exact: true}),
  ).toBeVisible()
  expect(page.getByRole('cell', {name: 'Customer 50'})).toBeVisible()

  // primeira página
  await page.getByRole('button', {name: 'Primeira página'}).click()

  expect(
    page.getByRole('cell', {name: 'Customer 1', exact: true}),
  ).toBeVisible()
  expect(page.getByRole('cell', {name: 'Customer 10'})).toBeVisible()
})

test('filter by orderId', async ({page}) => {
  await page.goto('/orders', {waitUntil: 'networkidle'})

  await page.getByTestId('order-id').fill('11')
  await page.getByRole('button', {name: 'Filtrar resultados'}).click()

  expect(page.getByRole('cell', {name: 'order-11', exact: true})).toBeVisible()
})

test('filter by wrong orderId', async ({page}) => {
  await page.goto('/orders', {waitUntil: 'networkidle'})

  await page.getByTestId('order-id').fill('100')
  await page.getByRole('button', {name: 'Filtrar resultados'}).click()

  expect(
    page.getByRole('cell', {name: 'order-100', exact: true}),
  ).not.toBeVisible()
})

test('filter by customer id', async ({page}) => {
  await page.goto('/orders', {waitUntil: 'networkidle'})

  await page.getByTestId('customer-name').fill('Customer 32')
  await page.getByRole('button', {name: 'Filtrar resultados'}).click()

  expect(
    page.getByRole('cell', {name: 'Customer 32', exact: true}),
  ).toBeVisible()
})

test('filter by status', async ({page}) => {
  await page.goto('/orders', {waitUntil: 'networkidle'})

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()
  await page.getByRole('button', {name: 'Filtrar resultados'}).click()

  const tableRows = await page.getByRole('cell', {name: 'Pendente'}).all() // obtém todas a linhas da tabela

  expect(tableRows.length).toBe(10)
})
