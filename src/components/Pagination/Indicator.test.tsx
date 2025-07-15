import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Indicator from './Indicator';
import type { IndicatorProps } from './Pagination.types';

describe('Indicator', () => {
  const onClick = vi.fn();
  const renderIndicator = (props: Partial<IndicatorProps> = {}) => {
    const defaultProps: IndicatorProps = {
      totalCount: 5,
      selectedIdx: 2,
      onClick,
      ...props,
    };
    return render(<Indicator {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('dot 개수만큼 버튼이 렌더링된다', () => {
    renderIndicator({ totalCount: 4 });
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('selectedIdx에 해당하는 버튼에 selected 클래스가 적용된다', () => {
    const { container } = renderIndicator({ selectedIdx: 1 });
    const buttons = container.querySelectorAll('button');
    expect(buttons[1].className).toContain('selected');
  });

  it('버튼 클릭 시 onClick이 호출된다', () => {
    renderIndicator();
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[3]);
    expect(onClick).toHaveBeenCalledWith(3);
  });
});
