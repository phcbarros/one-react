import {Box, Text, TextInput, TextInputProps} from '@phcbarros-ignite-ui/react'
import {Meta, StoryObj} from '@storybook/react'

export default {
  title: 'Form/TextInput',
  component: TextInput,
  args: {},
  decorators: [
    (Story) => {
      return (
        <Box
          as="label"
          css={{display: 'flex', flexDirection: 'column', gap: '$2'}}>
          <Text size="sm">Email Address</Text>
          {Story()}
        </Box>
      )
    },
  ],
} as Meta<TextInputProps>

export const Primary: StoryObj<TextInputProps> = {
  args: {
    placeholder: 'type your email',
  },
}

export const Disabled: StoryObj<TextInputProps> = {
  args: {
    disabled: true,
  },
}

export const WithPrefix: StoryObj<TextInputProps> = {
  args: {
    prefix: 'phcbarros.com/',
  },
}
