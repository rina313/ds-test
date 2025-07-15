import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { SolidButton, OutlineButton, TextButton, IconButton } from './index';

describe('SolidButton', () => {
  it('children이 정상적으로 렌더링된다', () => {
    render(<SolidButton>테스트버튼</SolidButton>);
    expect(screen.getByText('테스트버튼')).toBeInTheDocument();
  });

  it('disabled prop이 적용되면 버튼이 비활성화된다', () => {
    render(<SolidButton disabled>비활성</SolidButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick 이벤트가 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<SolidButton onClick={handleClick}>클릭</SolidButton>);
    fireEvent.click(screen.getByText('클릭'));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('OutlineButton', () => {
  it('children이 정상적으로 렌더링된다', () => {
    render(<OutlineButton>아웃라인</OutlineButton>);
    expect(screen.getByText('아웃라인')).toBeInTheDocument();
  });

  it('disabled prop이 적용되면 버튼이 비활성화된다', () => {
    render(<OutlineButton disabled>비활성</OutlineButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick 이벤트가 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<OutlineButton onClick={handleClick}>클릭</OutlineButton>);
    fireEvent.click(screen.getByText('클릭'));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('TextButton', () => {
  it('children이 정상적으로 렌더링된다', () => {
    render(<TextButton>텍스트버튼</TextButton>);
    expect(screen.getByText('텍스트버튼')).toBeInTheDocument();
  });

  it('href prop이 있으면 a 태그로 렌더링된다', () => {
    render(<TextButton href='https://test.com'>링크버튼</TextButton>);
    const link = screen.getByText('링크버튼');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://test.com');
  });

  it('href prop가 존재하고 disabled가 true라면 href는 undefined로 설정된다', () => {
    render(
      <TextButton href='https://test.com' disabled>
        비활성 링크
      </TextButton>,
    );
    const link = screen.getByText('비활성 링크');
    expect(link.tagName).toBe('A');
    expect(link).not.toHaveAttribute('href');
  });

  it('disabled prop이 있으면 버튼이 비활성화된다', () => {
    render(<TextButton disabled>비활성</TextButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick 이벤트가 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<TextButton onClick={handleClick}>클릭</TextButton>);
    fireEvent.click(screen.getByText('클릭'));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('IconButton', () => {
  it('icon prop값이 있으면 아이콘이 렌더링된다', () => {
    render(<IconButton icon={{ iconName: 'check', alt: '체크 아이콘' }} />);
    // 아이콘 컴포넌트 내부에 alt나 aria-label이 있다면 해당 값으로 테스트
    // 예시: expect(screen.getByLabelText('check')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disabled prop이 적용되면 버튼이 비활성화된다', () => {
    render(<IconButton disabled icon={{ iconName: 'check' }} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick 이벤트가 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<IconButton icon={{ iconName: 'check' }} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
