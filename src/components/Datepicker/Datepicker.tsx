import type { ReactElement } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import { createPortal } from 'react-dom';

import { IconButton } from '@/components/Button';
import FormLabel from '@/components/Form/Label';
import { Icon } from '@/components/Icon';
import 'react-datepicker/dist/react-datepicker.css';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRefPosition } from '@/hooks/useRefPosition';

import style from './Datepicker.module.scss';
import type { DatepickerProps, DatepickerVariant } from './Datepicker.types';

/**
 * Selection > Datepicker 컴포넌트
 * @description 사용자가 직접 날짜를 입력하거나 달력에서 날짜 또는 날짜 범위를 선택할 수 있습니다.
 */
export default function Datepicker({
  variant = 'day',
  isTooltip,
  labelText,
  isRange,
  minDate,
  maxDate,
  startDate: initStartDate = null,
  endDate: initEndDate = null,
  tooltipProps,
  onChangeDate,
}: DatepickerProps): ReactElement {
  const [isDatepickerOpen, setIsDatepickerOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([
    initStartDate,
    initEndDate,
  ]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const { style: datepickerPosition } = useRefPosition(isDatepickerOpen, wrapperRef);

  const [startDate, endDate] = selectedRange;

  const isDay = variant === 'day';
  const isMonth = variant === 'month';
  const isYear = variant === 'year';

  const showLabel = !!labelText || isTooltip;
  const dateFormatString = isDay ? 'yyyy.MM.dd' : isMonth ? 'yyyy.MM' : 'yyyy';
  const formatDateByVariant = (date: Date | null) =>
    date ? format(date, dateFormatString) : dateFormatString;

  const labelDateFormat = isRange
    ? selectedRange.map((d) => (d ? formatDateByVariant(d) : dateFormatString)).join('~')
    : formatDateByVariant(startDate);

  const isPlaceholder = !startDate && !endDate;

  /** Datepicker 열기/닫기 토글 함수 */
  const toggleDatepicker = () => {
    setIsDatepickerOpen((prev) => !prev);
  };

  const handleDateChange = (date: [Date | null, Date | null] | null) => {
    setSelectedRange(date ?? [null, null]);
    onChangeDate?.(date ?? [null, null]);
  };
  /** 외부 클릭 시 Datepicker 닫기 */
  useOutsideClick([wrapperRef, datepickerRef], () => setIsDatepickerOpen(false));

  useEffect(() => {
    setSelectedRange?.([initStartDate, initEndDate]);
  }, [initEndDate, initStartDate, isRange]);

  return (
    <div className={clsx(style['datepicker-container'])}>
      {showLabel && (
        <FormLabel labelText={labelText} isTooltip={isTooltip} tooltipProps={tooltipProps} />
      )}
      <div
        ref={wrapperRef}
        className={clsx(
          style['datepicker-wrapper'],
          style.state,
          isDatepickerOpen && style.focused,
        )}
        onClick={toggleDatepicker}
      >
        <p className={clsx(style['datepicker-input'], isPlaceholder && style.placeholder)}>
          {labelDateFormat.toLocaleUpperCase()}
        </p>
        <div className={clsx(style['datepicker-icon'])}>
          <Icon iconName='calendar' variants='fa-regular' />
        </div>
      </div>
      {isDatepickerOpen &&
        createPortal(
          <div
            ref={datepickerRef}
            style={datepickerPosition}
            className={style['datepicker-calendar']}
            data-testid='datepicker-calendar'
          >
            <DatePicker
              locale={ko}
              selected={!isRange ? startDate : undefined}
              startDate={isRange ? startDate : undefined}
              endDate={isRange ? endDate : undefined}
              onChange={handleDateChange}
              inline
              showMonthYearPicker={isMonth}
              showYearPicker={isYear}
              selectsRange
              renderCustomHeader={(props) => renderCustomHeader({ ...props, variant })}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

/** `react-datepicker` 커스텀 헤더 렌더링 컴포넌트 */
export const renderCustomHeader = ({
  date,
  decreaseYear,
  increaseYear,
  decreaseMonth,
  increaseMonth,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  variant,
}: ReactDatePickerCustomHeaderProps & { variant: DatepickerVariant }): ReactElement => {
  const isDay = variant === 'day';

  const getHeaderDateFormat = (): string => {
    switch (variant) {
      case 'day':
        return format(date, 'yyyy.MM');
      case 'month':
        return format(date, 'yyyy');
      case 'year': {
        const startYear = date.getFullYear() - 8;
        const endYear = date.getFullYear() + 3;
        return `${startYear} ~ ${endYear}`;
      }
      default:
        return '';
    }
  };
  return (
    <div className='calendar-header'>
      <span>{getHeaderDateFormat()}</span>
      <div className='calendar-header-buttons'>
        <IconButton
          onClick={isDay ? decreaseMonth : decreaseYear}
          disabled={isDay ? prevMonthButtonDisabled : prevYearButtonDisabled}
          icon={{ iconName: 'angle-left' }}
        />
        <IconButton
          onClick={isDay ? increaseMonth : increaseYear}
          disabled={isDay ? nextMonthButtonDisabled : nextYearButtonDisabled}
          icon={{ iconName: 'angle-right' }}
        />
      </div>
    </div>
  );
};
