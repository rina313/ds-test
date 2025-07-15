/**
 * stories에서 사용하는 argTypes, args 등의 값
 */
import type { Meta } from '@storybook/react/*';

export const tabDefaultMetaData: Meta = {
  argTypes: {
    options: {
      control: false,
      table: {
        type: {
          summary: 'string[] | ReactElement[]',
        },
      },
    },
    selectedIdx: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm'],
      table: {
        type: {
          summary: `s | m`,
        },
      },
    },
  },
  args: {
    options: ['버튼명', '버튼명', '버튼명', '버튼명'],
    size: 's',
  },
};

export const tabMetaData: Meta = {
  argTypes: {
    ...tabDefaultMetaData.argTypes,
    vertical: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    horizontal: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    ...tabDefaultMetaData.args,
    vertical: false,
    horizontal: false,
  },
};
export const segmentedControlMetaData: Meta = {
  argTypes: {
    ...tabDefaultMetaData.argTypes,
  },
  args: {
    ...tabDefaultMetaData.args,
  },
};
