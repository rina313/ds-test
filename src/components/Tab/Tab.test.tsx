import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Tab from './Tab';
import type { TabProps } from './Tab.types';

describe('Tab', () => {
  const onClick = vi.fn();
  const renderTab = (props: Partial<TabProps> = {}) => {
    const defaultProps: TabProps = {
      options: ['탭1', '탭2', '탭3'],
      selectedIdx: 0,
      onClick,
      size: 's',
      ...props,
    };
    return render(<Tab {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('options의 각 항목이 li로 렌더링된다', () => {
    renderTab({ options: ['A', 'B', 'C'] });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('selectedIdx에 해당하는 li에 selected 클래스가 적용된다', () => {
    const { container } = renderTab({ selectedIdx: 2 });
    const items = container.querySelectorAll('li');
    expect(items[2].className).toContain('selected');
  });

  it('size prop에 따라 올바른 클래스가 적용된다', () => {
    const { container } = renderTab({ size: 'm' });
    expect((container.firstChild as HTMLElement)?.className).toContain('size-m');
  });

  it('vertical prop이 true면 tab-wrapper에 vertical 클래스가 적용된다', () => {
    const { container } = renderTab({ vertical: true });
    const wrapper = container.querySelector('ul');
    expect(wrapper?.className).toContain('vertical');
  });

  it('horizontal prop이 true면 tab-container에 horizontal 클래스가 적용된다', () => {
    const { container } = renderTab({ horizontal: true });
    expect((container.firstChild as HTMLElement)?.className).toContain('horizontal');
  });

  it('li 클릭 시 onClick이 호출된다', () => {
    renderTab();
    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[1]);
    expect(onClick).toHaveBeenCalledWith(1);
  });
});
