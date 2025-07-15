import type { Meta } from '@storybook/react/*';

export const badgeDefaultMetaData: Meta = {
  args: {
    variants: 'number',
    count: 0,
    size: 's',
    show: true,
    border: true,
  },
  argTypes: {
    variants: {
      control: { type: 'select' },
      options: ['number', 'dot'],
      table: {
        type: { summary: 'number | dot' },
        defaultValue: { summary: 'number' },
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
    count: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      description: '0인 경우 보이지 않는다.',
    },
    show: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: 'count에 값이 있어도 false인 경우 보이지 않는다.',
    },
    border: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: false,
      description:
        '값이 넘어오지 않는 경우 bell IconButton이 기본 값이며, ReactElement를 전달합니다. 예: <SolidButton /> 등',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
  },
};
