import logoImage from '../../assets/logo-ignite.svg'
import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <NewTransactionButton type="button">
          Nova transação
        </NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
