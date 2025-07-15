import { type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { ExtendTooltipProps } from '@/components/Form/Form.types';

import { datepickerMetaData } from './Datepicker.meta';
import type { DatepickerProps } from './Datepicker.types';
import { Datepicker as DatepickerComponent } from './index';

type DatepickerExtendTooltipProps = DatepickerProps & ExtendTooltipProps;

const meta: Meta<typeof DatepickerComponent> = {
  title: 'Components/Menu/Datepicker',
  component: DatepickerComponent,
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 직접 날짜를 입력하거나 달력에서 날짜 또는 날짜 범위를 선택할 수 있습니다.',
      },
    },
  },
  ...datepickerMetaData,
};
export default meta;

export const AllVariants = ({
  startDate,
  endDate,
  maxDate,
  minDate,
  onChangeDate,
  ...args
}: DatepickerExtendTooltipProps): ReactElement => {
  const checkingDateType = (date: Date | number | null | undefined) => {
    if (!date) return;
    return typeof date === 'number' ? new Date(date) : date;
  };
  const parsedStartDate = checkingDateType(startDate);
  const parsedEndDate = checkingDateType(endDate);
  const parsedMaxDate = checkingDateType(maxDate);
  const parsedMinDate = checkingDateType(minDate);
  const { tooltipLabel, tooltipSize, tooltipVariants, tooltipArrow, tooltipPlacement } = args;

  return (
    <div className='flex-row' style={{ gap: 20 }}>
      <DatepickerComponent
        {...args}
        startDate={parsedStartDate}
        endDate={parsedEndDate}
        maxDate={parsedMaxDate}
        minDate={parsedMinDate}
        onChangeDate={onChangeDate}
        tooltipProps={{
          label: tooltipLabel,
          size: tooltipSize,
          variants: tooltipVariants,
          arrow: tooltipArrow,
          placement: tooltipPlacement,
          children: '',
        }}
      />
    </div>
  );
};
type Story = StoryObj<DatepickerProps>;

export const Day: Story = {
  args: { isRange: true, variant: 'day', labelText: '날짜 선택' },
};
export const Month: Story = {
  args: {
    variant: 'month',
    labelText: '월 선택',
    isRange: true,
  },
};
export const Year: Story = {
  args: {
    variant: 'year',
    labelText: '연도 선택',
    isRange: true,
  },
};
