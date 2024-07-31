import {ComponentProps, ElementRef, forwardRef} from 'react'
import {Input, Prefix, TextInputContainer} from './styles'

export interface TextInputProps
  extends ComponentProps<typeof Input>,
    React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  ({prefix, ...props}: Readonly<TextInputProps>, ref) => {
    return (
      <TextInputContainer>
        {!!prefix && <Prefix>{prefix}</Prefix>}
        <Input ref={ref} {...props} />
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
