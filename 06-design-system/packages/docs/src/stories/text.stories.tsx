import type {Meta, StoryObj} from '@storybook/react'

import {Text, TextProps} from '@phcbarros-ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus distinctio omnis officia perspiciatis voluptates assumenda quidem, eligendi voluptatibus minima molestiae recusandae earum dolore necessitatibus quos nulla quis repudiandae fugiat alias.',
  },
  argTypes: {
    size: {
      options: [
        'xxs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
      control: {
        type: 'inline-radio',
      },
    },
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

// export const XXSize: StoryObj<TextProps> = {
//   name: 'xxs',
//   args: {
//     size: 'xxs',
//   },
// }

// export const XSSize: StoryObj<TextProps> = {
//   name: 'xs',
//   args: {
//     size: 'xs',
//   },
// }

// export const SMSize: StoryObj<TextProps> = {
//   name: 'sm',
//   args: {
//     size: 'sm',
//   },
// }

// export const LGSize: StoryObj<TextProps> = {
//   name: 'lg',
//   args: {
//     size: 'lg',
//   },
// }

// export const XLSize: StoryObj<TextProps> = {
//   name: 'xl',
//   args: {
//     size: 'xl',
//   },
// }

// export const XL2Size: StoryObj<TextProps> = {
//   name: '2xl',
//   args: {
//     size: '2xl',
//   },
// }

// export const XL4Size: StoryObj<TextProps> = {
//   name: '4xl',
//   args: {
//     size: '4xl',
//   },
// }

// export const XL5Size: StoryObj<TextProps> = {
//   name: '5xl',
//   args: {
//     size: '5xl',
//   },
// }

// export const XL6Size: StoryObj<TextProps> = {
//   name: '6xl',
//   args: {
//     size: '6xl',
//   },
// }

// export const XL7Size: StoryObj<TextProps> = {
//   name: '7xl',
//   args: {
//     size: '7xl',
//   },
// }

// export const XL8Size: StoryObj<TextProps> = {
//   name: '8xl',
//   args: {
//     size: '8xl',
//   },
// }

// export const XL9Size: StoryObj<TextProps> = {
//   name: '9xl',
//   args: {
//     size: '9xl',
//   },
// }
