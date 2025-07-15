import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import SegmentedControl from './SegmentedControl';
import type { SegmentedControlProps } from './Tab.types';

describe('SegmentedControl', () => {
  const onClick = vi.fn();
  const renderSegmented = (props: Partial<SegmentedControlProps> = {}) => {
    const defaultProps: SegmentedControlProps = {
      options: ['옵션1', '옵션2', '옵션3'],
      selectedIdx: 0,
      onClick,
      size: 's',
      ...props,
    };
    return render(<SegmentedControl {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('options의 각 항목이 버튼으로 렌더링된다', () => {
    renderSegmented({ options: ['A', 'B', 'C'] });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('selectedIdx에 해당하는 버튼에 selected 클래스가 적용된다', () => {
    const { container } = renderSegmented({ selectedIdx: 1 });
    const buttons = container.querySelectorAll('button');
    expect(buttons[1].className).toContain('selected');
  });

  it('size prop에 따라 올바른 클래스가 적용된다', () => {
    const { container } = renderSegmented({ size: 'm' });
    expect((container.firstChild as HTMLElement)?.className).toContain('size-m');
  });

  it('maxWidth prop이 있으면 style에 maxWidth가 적용된다', () => {
    const { container } = renderSegmented({ maxWidth: '300px' });
    const root = container.firstChild as HTMLElement;
    expect(root.style.maxWidth).toBe('300px');
  });

  it('버튼 클릭 시 onClick이 호출된다', () => {
    renderSegmented();
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]);
    expect(onClick).toHaveBeenCalledWith(2);
  });

  it('maxWidth가 적용된 상태에서 options가 maxWidth를 초과하면 버튼이 하단으로 줄바꿈된다', () => {
    // 6개의 긴 옵션, maxWidth를 작게 설정
    const options = ['옵션1', '옵션2', '옵션3', '옵션4', '옵션5', '옵션6'];
    const { container } = renderSegmented({ options, maxWidth: '200px' });
    const root = container.firstChild as HTMLElement;
    // 버튼이 여러 줄로 렌더링되는지 확인 (offsetHeight가 버튼 1개 높이의 2배 이상이면 줄바꿈)
    const buttons = container.querySelectorAll('button');
    const buttonHeight = buttons[0].offsetHeight;
    expect(root.offsetHeight).toBeGreaterThan(buttonHeight * 1.5);
  });
});
