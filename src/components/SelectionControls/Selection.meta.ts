/**
 * stories에서 사용하는 argTypes, args 등의 값
 */

import type { Meta } from '@storybook/react/*';

export const selectionDefaultMetaData: Meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
  },
};

export const checkedEventData: Meta = {
  argTypes: {
    checked: {
      control: 'boolean',
    },
    label: {
      control: false,
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    ...selectionDefaultMetaData.argTypes,
  },
  args: {
    checked: false,
    label: '텍스트 입력',
    ...selectionDefaultMetaData.args,
  },
};
export const switchMetaData: Meta = {
  argTypes: {
    on: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: ['s', 'm'],
      table: {
        type: {
          summary: `s | m`,
        },
      },
    },
    ...selectionDefaultMetaData.argTypes,
  },
  args: {
    on: false,
    size: 'm',
    ...selectionDefaultMetaData.args,
  },
};
