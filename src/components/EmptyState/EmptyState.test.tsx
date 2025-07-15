import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import EmptyState from './EmptyState';

const DummyChild = () => <span data-testid='dummy-child'>child</span>;

describe('EmptyState', () => {
  it('title, subTitle, children이 렌더링된다', () => {
    render(
      <EmptyState title='테스트 타이틀' subTitle='테스트 서브타이틀'>
        <DummyChild />
      </EmptyState>,
    );
    expect(screen.getByText('테스트 타이틀')).toBeInTheDocument();
    expect(screen.getByText('테스트 서브타이틀')).toBeInTheDocument();
    expect(screen.getByTestId('dummy-child')).toBeInTheDocument();
  });

  it('button prop이 있으면 OutlineButton이 렌더링된다', () => {
    const buttonProps = { children: '버튼', onClick: () => {} };
    render(<EmptyState button={buttonProps} />);
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('title, subTitle이 없으면 해당 요소가 렌더링되지 않는다', () => {
    render(<EmptyState />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });
});
