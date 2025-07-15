import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Slider from './Slider';
import type { SliderProps } from './Slider.types';

describe('Slider', () => {
  const onChangeRange = vi.fn();
  const renderSlider = (props: Partial<SliderProps> = {}) => {
    const defaultProps: SliderProps = {
      max: 100,

      onChangeRange,

      ...props,
    };
    return render(<Slider {...defaultProps} />);
  };

  beforeEach(() => {
    onChangeRange.mockClear();
  });

  it('labelText가 렌더링된다', () => {
    renderSlider({ labelText: '라벨' });
    expect(screen.getByText('라벨')).toBeInTheDocument();
  });

  it('showValue가 true면 값이 표시된다', () => {
    renderSlider({ minValue: 10, maxValue: 20, showValue: true, unitText: '개' });
    expect(screen.getByText('10개 ~ 20개')).toBeInTheDocument();
  });

  it('showValue가 false면 값이 표시되지 않는다', () => {
    renderSlider({ showValue: false });
    expect(screen.queryByText(/~|원/)).not.toBeInTheDocument();
  });

  it('isSingle이 true면 maxValue만 표시된다', () => {
    renderSlider({ isSingle: true, maxValue: 55, unitText: '점' });
    expect(screen.getByText('55점')).toBeInTheDocument();
  });

  it('disabled가 true면 disabled 클래스가 적용된다', () => {
    const { container } = renderSlider({ disabled: true });
    expect((container.firstChild as HTMLElement)?.className).toContain('disabled');
  });

  it('unitText가 있으면 값에 단위가 붙는다', () => {
    renderSlider({ minValue: 1, maxValue: 2, unitText: 'kg' });
    expect(screen.getByText('1kg ~ 2kg')).toBeInTheDocument();
  });
  it('minValue가 min보다 작으면 min값으로 표시된다', () => {
    renderSlider({ min: 10, max: 50, minValue: 5, maxValue: 40 });
    expect(screen.getByText('10 ~ 40')).toBeInTheDocument();
  });

  it('maxValue가 max보다 크면 max값으로 표시된다', () => {
    renderSlider({ min: 5, max: 40, minValue: 10, maxValue: 50 });
    expect(screen.getByText('10 ~ 40')).toBeInTheDocument();
  });

  it('슬라이더 thumb을 마우스 다운하면 onChangeRange가 호출된다', () => {
    const { container } = renderSlider();
    const thumbs = container.querySelectorAll('.thumb');
    // min thumb
    fireEvent.mouseDown(thumbs[0]);
    // mousemove 이벤트 시뮬레이션
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);
    expect(onChangeRange).toHaveBeenCalled();
  });

  it('thumb을 드래그하는 동안 value 툴팁이 렌더링된다', () => {
    const { container } = renderSlider({ minValue: 10, maxValue: 40 });
    const thumbs = container.querySelectorAll('.thumb');
    fireEvent.mouseDown(thumbs[0]);
    expect(container.querySelector('.tooltip')?.textContent).toBe('10');
    fireEvent.mouseMove(document, { clientX: 100 });
    expect(container.querySelector('.tooltip')?.textContent).not.toBe('10');
    fireEvent.mouseUp(document);
  });
});
