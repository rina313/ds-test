import type { Meta } from '@storybook/react/*';

import type { DatepickerProps } from './Datepicker.types';
import { formLabelMetaData } from '../Form/Form.meta';

export const datepickerMetaData: Meta<DatepickerProps> = {
  argTypes: {
    variant: {
      control: 'select',
      description: '입력창의 입력 값',
      options: ['day', 'month', 'year'],
      table: {
        type: {
          summary: 'day | month | year',
        },
      },
    },
    isRange: {
      control: 'boolean',
      description: '날짜 다중 선택 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    startDate: {
      control: 'date',
      table: {
        type: {
          summary: 'Date | null',
        },
      },
    },
    endDate: {
      control: 'date',
      table: {
        type: {
          summary: 'Date | null',
        },
      },
      if: {
        arg: 'isRange',
        eq: true,
      },
    },
    onChangeDate: {
      description: '날짜 값 변경 핸들러',
      table: {
        type: {
          summary: '(value: Date | null | [Date | null, Date | null] | null) => void',
        },
      },
    },
    ...formLabelMetaData.argTypes,
  },
  args: {
    variant: 'day',
    isRange: false,
    startDate: null,
    endDate: null,
    ...formLabelMetaData.args,
  },
};
