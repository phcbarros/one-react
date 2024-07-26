import {ComponentProps} from 'react'
import {Input, Prefix, TextInputContainer} from './styles'

export interface TextInputProps
  extends ComponentProps<typeof Input>,
    React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

export function TextInput({prefix, ...props}: Readonly<TextInputProps>) {
  return (
    <TextInputContainer>
      {!!prefix && <Prefix>{prefix}</Prefix>}
      <Input {...props} />
    </TextInputContainer>
  )
}
