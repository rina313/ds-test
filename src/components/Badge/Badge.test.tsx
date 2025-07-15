import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '@testing-library/jest-dom';
import Badge from './Badge';

describe('Badge', () => {
  it('children이 있으면 children을 렌더링한다', () => {
    render(<Badge>Custom Content</Badge>);
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('children이 없으면 기본 IconButton(알림)을 렌더링한다', () => {
    render(<Badge />);
    const button = screen.getByRole('button');
    const labelSpan = button.querySelector('span[aria-label="알림"]');
    expect(labelSpan).toBeInTheDocument();
  });

  it('variants가 number이고 count가 0이면 badge가 보이지 않는다', () => {
    render(<Badge variants='number' count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('variants가 number이고 count가 10이면 badge에 10이 보인다', () => {
    render(<Badge variants='number' count={10} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('count가 100 이상이면 99+로 표시된다', () => {
    render(<Badge variants='number' count={120} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('variants가 dot이고, count가 0이 아니라면 badge가 보인다', () => {
    render(<Badge variants='dot' count={1} />);
    const dot = document.querySelector('.badge.dot');
    expect(dot).toBeInTheDocument();
  });

  it('show가 false면 count값이 0이 아니어도 badge가 보이지 않는다', () => {
    render(<Badge show={false} count={10} />);
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('className이 전달되면 wrapper에 적용된다', () => {
    render(<Badge className='test-class' />);
    const wrapper = document.querySelector('.wrapper');
    expect(wrapper).toHaveClass('test-class');
  });
});
