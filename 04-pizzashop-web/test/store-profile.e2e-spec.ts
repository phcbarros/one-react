import {expect, test} from '@playwright/test'

test('update profile successfully', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'})

  await page.getByRole('button', {name: 'Pizza Shop'}).click()
  await page.getByRole('menuitem', {name: 'Perfil da loja'}).click()

  await page.getByLabel('Nome').fill('Pizza Planet')
  await page.getByLabel('Descrição').fill('A melhor pizza do mundo')

  await page.getByRole('button', {name: 'Salvar'}).click()

  await page.waitForLoadState('networkidle') // esperar a atualização dos dados

  const toast = page.getByText('Perfil atualizado com sucesso!')

  await expect(toast).toBeVisible()

  await page.getByRole('button', {name: 'Close'}).click()

  await expect(
    page.getByRole('button', {name: 'Pizza Planet'}),
  ).toBeInViewport()
})

test('update profile with error', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'})

  await page.getByRole('button', {name: 'Pizza Shop'}).click()
  await page.getByText('Perfil da loja').click()

  await page.getByLabel('Nome').fill('Rocket Planet')
  await page.getByLabel('Descrição').fill('A melhor pizza do mundo')

  await page.getByRole('button', {name: 'Salvar'}).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Falha ao atualizar perfil, tente novamente!')

  await expect(toast).toBeVisible()

  await page.getByRole('button', {name: 'Close'}).click()

  await expect(page.getByRole('button', {name: 'Pizza Shop'})).toBeInViewport()
})
