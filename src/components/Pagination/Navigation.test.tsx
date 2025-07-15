import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Navigation from './Navigation';
import type { NavigationProps } from './Pagination.types';

describe('Navigation', () => {
  const onClick = vi.fn();
  const renderNavigation = (props: Partial<NavigationProps> = {}) => {
    const defaultProps: NavigationProps = {
      currentPage: 1,
      totalPage: 20,
      perPage: 5,
      onClick,
      ...props,
    };
    return render(<Navigation {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('페이지 번호 버튼이 perPage 개수만큼 렌더링된다', () => {
    renderNavigation({ currentPage: 1, totalPage: 20, perPage: 5 });
    const pageButtons = screen.getAllByRole('button').slice(1, -1); // 첫, 마지막은 chevron
    expect(pageButtons).toHaveLength(5);
    expect(pageButtons[0]).toHaveTextContent('1');
    expect(pageButtons[4]).toHaveTextContent('5');
  });

  it('현재 페이지에 current 클래스가 적용된다', () => {
    const { container } = renderNavigation({ currentPage: 3 });
    const currentBtn = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent === '3',
    );
    expect(currentBtn?.className).toContain('current');
  });

  it('chevron 버튼 클릭 시 onClick이 올바른 페이지로 호출된다', () => {
    renderNavigation({ currentPage: 6, perPage: 5 });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // prev chevron
    expect(onClick).toHaveBeenCalledWith(1); // 6-5=1
    fireEvent.click(buttons[buttons.length - 1]); // next chevron
    expect(onClick).toHaveBeenCalledWith(11); // 6+5=11
  });

  it('페이지 번호 버튼 클릭 시 onClick이 해당 페이지로 호출된다', () => {
    renderNavigation({ currentPage: 1, perPage: 5 });
    const pageButtons = screen.getAllByRole('button').slice(1, -1);
    fireEvent.click(pageButtons[2]); // 3번 페이지
    expect(onClick).toHaveBeenCalledWith(3);
  });
});
