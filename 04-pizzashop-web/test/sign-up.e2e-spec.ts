import {expect, test} from 'playwright/test'

test('sign up successfully', async ({page}) => {
  await page.goto('/sign-up', {waitUntil: 'networkidle'})

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu email').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone').fill('11999999999')
  await page.getByRole('button', {name: 'Finalizar cadastro'}).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')
  expect(toast).toBeVisible()
})

test('sign up with error', async ({page}) => {
  await page.goto('/sign-up', {waitUntil: 'networkidle'})

  await page.getByLabel('Nome do estabelecimento').fill('Wrong Name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu email').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone').fill('11999999999')
  await page.getByRole('button', {name: 'Finalizar cadastro'}).click()

  const toast = page.getByText('Erro ao cadastrar restaurante!')
  expect(toast).toBeVisible()
})
