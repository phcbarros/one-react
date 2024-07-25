import type {Meta, StoryObj} from '@storybook/react'

import {Button, ButtonProps} from '@phcbarros-ignite-ui/react'

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Enviar',
  },
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {}

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    size: 'big',
  },
}
