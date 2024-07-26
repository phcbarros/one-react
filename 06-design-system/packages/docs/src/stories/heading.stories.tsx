import type {Meta, StoryObj} from '@storybook/react'

import {Heading, HeadingProps} from '@phcbarros-ignite-ui/react'

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Custom Title',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', '2xl', '4xl', '5xl', '6xl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 Heading',
    as: 'h1',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Por padrão o `Heading` sempre vai ser um `h2`, mas podemos alterar isso com a propriedade `as`.',
      },
    },
  },
}

// export const SMSize: StoryObj<HeadingProps> = {
//   name: 'sm',
//   args: {
//     size: 'sm',
//   },
// }

// export const LGSize: StoryObj<HeadingProps> = {
//   name: 'lg',
//   args: {
//     size: 'lg',
//   },
// }

// export const XL2Size: StoryObj<HeadingProps> = {
//   name: '2xl',
//   args: {
//     size: '2xl',
//   },
// }

// export const XL3Size: StoryObj<HeadingProps> = {
//   name: '3xl',
//   args: {
//     size: '3xl',
//   },
// }

// export const XL4Size: StoryObj<HeadingProps> = {
//   name: '4xl',
//   args: {
//     size: '4xl',
//   },
// }

// export const XL5Size: StoryObj<HeadingProps> = {
//   name: '5xl',
//   args: {
//     size: '5xl',
//   },
// }

// export const XL6Size: StoryObj<HeadingProps> = {
//   name: '6xl',
//   args: {
//     size: '6xl',
//   },
// }
