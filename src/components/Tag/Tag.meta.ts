import type { Meta } from '@storybook/react/*';

export const TagDefaultMetaData: Meta = {
  args: {
    variants: 'solid',
    size: 'm',
    iconName: 'expand',
    label: '',
  },
  argTypes: {
    variants: {
      control: { type: 'select' },
      options: ['solid', 'outline'],
      table: {
        type: { summary: 'solid | outline' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm'],
      table: {
        type: { summary: 's | m' },
        defaultValue: { summary: 's' },
      },
    },
    iconName: {
      control: 'select',
      description: 'fontAwesome에서 제공하는 아이콘 이름',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};
