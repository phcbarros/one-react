import {ButtonContainer, type ButtonVariant} from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({variant = 'primary'}: ButtonProps) {
  return (
    <ButtonContainer type="button" variant={variant}>
      Enviar
    </ButtonContainer>
  )
}
