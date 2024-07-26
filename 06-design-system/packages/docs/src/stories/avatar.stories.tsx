import type {Meta, StoryObj} from '@storybook/react'

import {Avatar, AvatarProps} from '@phcbarros-ignite-ui/react'

export default {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  args: {
    src: 'https://github.com/phcbarros.png',
    alt: 'Paulo Barros',
  },
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {}

export const WithFallBack: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
  },
}
