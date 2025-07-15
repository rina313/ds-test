import { render, screen } from '@testing-library/react';

import Counter from './Counter';
import type { CounterProps } from './Pagination.types';

describe('Counter', () => {
  const renderCounter = (props: Partial<CounterProps> = {}) => {
    const defaultProps: CounterProps = {
      totalPage: 10,
      currentPage: 1,
      size: 'm',
      ...props,
    };
    return render(<Counter {...defaultProps} />);
  };

  it('현재 페이지와 전체 페이지를 올바르게 표시한다', () => {
    renderCounter({ currentPage: 3, totalPage: 15 });
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('size prop에 따라 올바른 클래스가 적용된다', () => {
    const { container } = renderCounter({ size: 's' });
    expect(container.firstChild).toHaveClass('size-s');
  });
});
