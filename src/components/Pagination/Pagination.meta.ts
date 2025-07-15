/**
 * stories에서 사용하는 argTypes, args 등의 값
 */
import type { Meta } from '@storybook/react/*';

export const paginationDefaultMetaData: Meta = {
  argTypes: {
    totalPage: {
      control: {
        type: 'number',
        min: 10,
        max: 100,
      },
    },
    currentPage: {
      control: {
        type: 'number',
        min: 1,
        max: 100,
      },
    },
  },
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};

export const CounterMetaData: Meta = {
  argTypes: {
    ...paginationDefaultMetaData.argTypes,
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
    ...paginationDefaultMetaData.args,
    size: 'm',
  },
};
export const IndicatorMetaData: Meta = {
  argTypes: {
    totalCount: {
      control: {
        type: 'number',
        min: 5,
        max: 40,
      },
    },
    selectedIdx: {
      control: {
        type: 'number',
        min: 0,
        max: 39,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    totalCount: 10,
    selectedIdx: 0,
  },
};

export const NavigationMetaData: Meta = {
  argTypes: {
    ...paginationDefaultMetaData.argTypes,
    perPage: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    ...paginationDefaultMetaData.args,
    perPage: 10,
    totalPage: 50,
  },
};
