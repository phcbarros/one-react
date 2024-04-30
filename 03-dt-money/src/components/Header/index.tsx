import * as Dialog from '@radix-ui/react-dialog'
import logoImage from '../../assets/logo-ignite.svg'

import {NewTransactionModal} from '../NewTransactionModal'
import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton type="button">
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
