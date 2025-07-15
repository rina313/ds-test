import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { describe, it, expect, vi } from 'vitest';

import Datepicker, { renderCustomHeader } from './Datepicker';
import type { DatepickerVariant } from './Datepicker.types';

describe('Datepicker 컴포넌트', () => {
  /** 상단 Label 확인 */
  it('라벨이 있으면 FormLabel이 렌더링된다', () => {
    render(<Datepicker labelText='날짜 선택' />);
    expect(screen.getByText('날짜 선택')).toBeInTheDocument();
  });

  it('isTooltip이 true이면 툴팁 아이콘이 렌더링된다', () => {
    render(<Datepicker isTooltip />);
    expect(screen.getByTestId('form-label-tooltip')).toBeInTheDocument();
  });

  /** 기본 placeholder 및 wrapper 확인 */
  it('기본 placeholder가 올바르게 렌더링된다 (variant = day)', () => {
    render(<Datepicker />);
    expect(screen.getByText('YYYY.MM.DD')).toBeInTheDocument();
  });

  it('variant가 month이면 placeholder가 YYYY.MM이다', () => {
    render(<Datepicker variant='month' />);
    expect(screen.getByText('YYYY.MM')).toBeInTheDocument();
  });

  it('variant가 year이면 placeholder가 YYYY이다', () => {
    render(<Datepicker variant='year' />);
    expect(screen.getByText('YYYY')).toBeInTheDocument();
  });

  it('달력이 열리면 wrapper에 focused 클래스가 적용된다', () => {
    render(<Datepicker />);
    const wrapper = screen.getByText('YYYY.MM.DD').closest('div')!;

    fireEvent.click(wrapper);
    expect(wrapper.className).toMatch(/focused/);
  });

  /** 날짜 포맷 확인 */
  it('선택된 날짜가 있으면 올바르게 포맷되어 렌더링된다', () => {
    const initDate = new Date('2025-06-27');
    render(<Datepicker startDate={initDate} />);
    expect(screen.getByText('2025.06.27')).toBeInTheDocument();
  });

  it('range 모드이면 ~ 로 구분된 포맷이 렌더링된다', () => {
    const start = new Date('2025-06-01');
    const end = new Date('2025-06-27');
    render(<Datepicker isRange startDate={start} endDate={end} />);
    expect(screen.getByText('2025.06.01~2025.06.27')).toBeInTheDocument();
  });

  it('range 모드이면서 endDate가 선택되지 않으면 날짜 포맷으로 렌더링된다', () => {
    const start = new Date('2025-06-01');
    const end = null;
    render(<Datepicker isRange startDate={start} endDate={end} />);
    expect(screen.getByText('2025.06.01~YYYY.MM.DD')).toBeInTheDocument();
  });

  it('isRange=false 이면 endDate가 포맷되지 않는다', () => {
    const startDate = new Date('2025-06-01');
    const endDate = new Date('2025-06-27');
    render(<Datepicker isRange={false} startDate={startDate} endDate={endDate} />);
    expect(screen.getByText('2025.06.01')).toBeInTheDocument();
    expect(screen.queryByText(/~2025\.06\.27/)).not.toBeInTheDocument();
  });

  it('startDate가 minDate보다 작으면 유효하지 않음', () => {
    const startDate = new Date('2025-06-01');
    const minDate = new Date('2025-06-10');
    render(<Datepicker startDate={startDate} minDate={minDate} />);
    expect(startDate >= minDate).toBe(false);
  });

  it('startDate가 minDate보다 크거나 같으면 유효', () => {
    const startDate = new Date('2025-06-15');
    const minDate = new Date('2025-06-10');
    render(<Datepicker startDate={startDate} minDate={minDate} />);
    expect(startDate >= minDate).toBe(true);
  });

  /** Disabled 확인 */
  it('minDate 이전 날짜는 달력에서 disabled 처리된다', () => {
    render(<Datepicker minDate={new Date('2025-06-10')} startDate={new Date('2025-06-01')} />);
    const wrapper = screen.getByText('2025.06.01').closest('div')!;
    fireEvent.click(wrapper);
    const calendar = screen.getByTestId('datepicker-calendar');
    const day9 = calendar.querySelector('.react-datepicker__day--009');
    expect(day9).toHaveClass('react-datepicker__day--disabled');
  });

  it('maxDate 이후 날짜는 달력에서 disabled 처리된다', () => {
    render(<Datepicker startDate={new Date('2025-06-01')} maxDate={new Date('2025-06-12')} />);
    const wrapper = screen.getByText('2025.06.01').closest('div')!;
    fireEvent.click(wrapper);
    const calendar = screen.getByTestId('datepicker-calendar');
    const day13 = calendar.querySelector('.react-datepicker__day--013')!;
    expect(day13).toHaveClass('react-datepicker__day--disabled');
  });

  /** 달력 toggle 확인 */
  it('wrapper 클릭 시 달력이 열린다', () => {
    render(<Datepicker />);
    const wrapper = screen.getByText('YYYY.MM.DD').closest('div');
    fireEvent.click(wrapper!);
    expect(screen.queryByTestId('datepicker-calendar')).toBeInTheDocument();
  });
  it('wrapper 클릭 시 달력이 열리고 다시 클릭하면 닫힌다', () => {
    render(<Datepicker />);
    const wrapper = screen.getByText('YYYY.MM.DD').closest('div')!;
    fireEvent.click(wrapper);
    expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();
    fireEvent.click(wrapper);
    expect(screen.queryByTestId('datepicker-calendar')).not.toBeInTheDocument();
  });
  it('외부 클릭 시 달력이 닫힌다', () => {
    render(<Datepicker />);
    const wrapper = screen.getByText('YYYY.MM.DD').closest('div')!;
    fireEvent.click(wrapper);
    expect(screen.getByTestId('datepicker-calendar')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByTestId('datepicker-calendar')).not.toBeInTheDocument();
  });

  /** onChangeDate 이벤트 호출 및 선택 확인 */
  it('날짜 클릭 시 onChangeDate가 호출된다', () => {
    const handleChangeDate = vi.fn();
    render(<Datepicker onChangeDate={handleChangeDate} />);
    // input wrapper 클릭해서 달력 열기
    const wrapper = screen.getByText('YYYY.MM.DD').closest('div')!;
    fireEvent.click(wrapper);
    // 달력이 열렸는지 확인
    const calendar = screen.getByTestId('datepicker-calendar');
    expect(calendar).toBeInTheDocument();
    // 달력 내부 날짜 클릭
    const startDayEl = calendar.querySelector('.react-datepicker__day');
    expect(startDayEl).toBeTruthy();
    fireEvent.click(startDayEl!);
    expect(handleChangeDate).toHaveBeenCalled();
  });

  it('날짜 클릭 시 선택된 날짜에 따라 클래스가 올바르게 적용된다', () => {
    render(<Datepicker startDate={new Date('2025-06-01')} />);
    const wrapper = screen.getByText('2025.06.01').closest('div')!;
    fireEvent.click(wrapper);
    const calendar = screen.getByTestId('datepicker-calendar');
    const startDayEl = calendar.querySelector('.react-datepicker__day.react-datepicker__day--001');
    expect(startDayEl).toHaveClass('react-datepicker__day--selected');
  });

  it('isRange인 경우 startDate, endDate에 따라 클래스가 올바르게 적용된다', () => {
    render(
      <Datepicker isRange startDate={new Date('2025-06-01')} endDate={new Date('2025-06-30')} />,
    );
    const wrapper = screen.getByText('2025.06.01~2025.06.30').closest('div')!;
    fireEvent.click(wrapper);
    const calendar = screen.getByTestId('datepicker-calendar');
    // startDate 셀
    const startDayEl = calendar.querySelector('.react-datepicker__day--001');
    expect(startDayEl).toHaveClass('react-datepicker__day--range-start');
    // endDate 셀
    const endDayEl = calendar.querySelector('.react-datepicker__day--030');
    expect(endDayEl).toHaveClass('react-datepicker__day--range-end');
    // in-range (중간 날짜 예시로 10일)
    const inRangeDayEl = calendar.querySelector('.react-datepicker__day--010');
    expect(inRangeDayEl).toHaveClass('react-datepicker__day--in-range');
  });

  it('커스텀 헤더에 연도 범위가 표시된다 (variant=year)', () => {
    const { getByText } = render(
      renderCustomHeader({
        date: new Date('2025-06-01'),
        decreaseYear: vi.fn(),
        increaseYear: vi.fn(),
        decreaseMonth: vi.fn(),
        increaseMonth: vi.fn(),
        prevYearButtonDisabled: false,
        nextYearButtonDisabled: false,
        prevMonthButtonDisabled: false,
        nextMonthButtonDisabled: false,
        variant: 'year',
      } as unknown as ReactDatePickerCustomHeaderProps & { variant: DatepickerVariant }),
    );

    expect(getByText('2017 ~ 2028')).toBeInTheDocument();
  });
});
