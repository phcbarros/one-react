import type {Meta, StoryObj} from '@storybook/react'

import {Text, TextProps} from '@phcbarros-ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus distinctio omnis officia perspiciatis voluptates assumenda quidem, eligendi voluptatibus minima molestiae recusandae earum dolore necessitatibus quos nulla quis repudiandae fugiat alias.',
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong text',
    as: 'strong',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Por padrão o `Text` sempre vai ser um `p`, mas podemos alterar isso com a propriedade `as`.',
      },
    },
  },
}

export const XXSize: StoryObj<TextProps> = {
  args: {
    size: 'xxs',
  },
}

export const XSSize: StoryObj<TextProps> = {
  args: {
    size: 'xs',
  },
}

export const SMSize: StoryObj<TextProps> = {
  args: {
    size: 'sm',
  },
}

export const LGSize: StoryObj<TextProps> = {
  args: {
    size: 'lg',
  },
}

export const XLSize: StoryObj<TextProps> = {
  args: {
    size: 'xl',
  },
}

export const XL2Size: StoryObj<TextProps> = {
  args: {
    size: '2xl',
  },
}

export const XL4Size: StoryObj<TextProps> = {
  args: {
    size: '4xl',
  },
}

export const XL5Size: StoryObj<TextProps> = {
  args: {
    size: '5xl',
  },
}

export const XL6Size: StoryObj<TextProps> = {
  args: {
    size: '6xl',
  },
}

export const XL7Size: StoryObj<TextProps> = {
  args: {
    size: '7xl',
  },
}

export const XL8Size: StoryObj<TextProps> = {
  args: {
    size: '8xl',
  },
}

export const XL9Size: StoryObj<TextProps> = {
  args: {
    size: '9xl',
  },
}
