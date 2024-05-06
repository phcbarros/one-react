import * as Dialog from '@radix-ui/react-dialog'
import logoImage from '../../assets/logo-ignite.svg'

import {useContextSelector} from 'use-context-selector'
import {TransactionsContext} from '../../contexts/TransactionsContext'
import {NewTransactionModal} from '../NewTransactionModal'
import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'

export function Header() {
  const {isOpen, toggleModal} = useContextSelector(
    TransactionsContext,
    (context) => {
      return {isOpen: context.isOpen, toggleModal: context.toggleModal}
    },
  )

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <Dialog.Root open={isOpen} onOpenChange={toggleModal}>
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
