import type { Meta } from '@storybook/react/*';

import type { AvatarProps } from './Avatar.types';

export const avatarMetaData: Meta<AvatarProps> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['circle', 'square'],
      table: {
        type: {
          summary: 'circle | square',
        },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
      table: {
        type: {
          summary: 'xs | s | m',
        },
      },
    },
    imageUrl: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  args: {
    variant: 'circle',
    size: 'm',
    imageUrl: '',
  },
};
