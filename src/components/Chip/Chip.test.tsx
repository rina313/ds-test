import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Chip from './Chip';

describe('Chip', () => {
  it('label이 정상적으로 렌더링된다', () => {
    render(<Chip label='테스트 칩' />);
    expect(screen.getByText('테스트 칩')).toBeInTheDocument();
  });

  it('variants, size, active에 따라 className이 포함된다', () => {
    const { container } = render(<Chip label='Styled' variants='secondary' size='xs' active />);
    expect(container.firstChild).toHaveClass('secondary');
    expect(container.firstChild).toHaveClass('xs');
    expect(container.firstChild).toHaveClass('active');
  });

  it(`disabled prop이 true면 disabled 클래스가 적용되고 
    onClick, leadingClick, trailingClick 이벤트가 실행되지 않는다.`, () => {
    const handleClick = vi.fn();
    const leadingClick = vi.fn();
    const trailingClick = vi.fn();
    render(
      <Chip
        label='칩'
        disabled
        onClick={handleClick}
        leadingIcon={{ iconName: 'check', alt: '체크' }}
        trailingIcon={{ iconName: 'close', alt: '닫기' }}
        leadingClick={leadingClick}
        trailingClick={trailingClick}
      />,
    );
    const chip = screen.getByText('칩').parentElement;
    expect(chip).toHaveClass('disabled');
    fireEvent.click(chip!);
    expect(handleClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('체크'));
    expect(leadingClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(trailingClick).not.toHaveBeenCalled();
  });

  it('leadingIcon, trailingIcon이 있으면 아이콘이 렌더링된다', () => {
    render(
      <Chip
        label='칩'
        leadingIcon={{ iconName: 'check', alt: '체크' }}
        trailingIcon={{ iconName: 'close', alt: '닫기' }}
      />,
    );
    expect(screen.getByLabelText('체크')).toBeInTheDocument();
    expect(screen.getByLabelText('닫기')).toBeInTheDocument();
  });

  it('onClick이 정상 동작한다', () => {
    const handleClick = vi.fn();
    render(<Chip label='칩' onClick={handleClick} />);
    fireEvent.click(screen.getByText('칩'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('leadingClick, trailingClick이 정상 동작한다', () => {
    const leadingClick = vi.fn();
    const trailingClick = vi.fn();
    render(
      <Chip
        label='칩'
        leadingIcon={{ iconName: 'check', alt: '체크' }}
        trailingIcon={{ iconName: 'close', alt: '닫기' }}
        leadingClick={leadingClick}
        trailingClick={trailingClick}
      />,
    );
    fireEvent.click(screen.getByLabelText('체크'));
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(leadingClick).toHaveBeenCalled();
    expect(trailingClick).toHaveBeenCalled();
  });

  it('onClick, leadingClick, trailingClick이 함께 적용되어도 각각 정상 동작한다', () => {
    const handleClick = vi.fn();
    const leadingClick = vi.fn();
    const trailingClick = vi.fn();
    render(
      <Chip
        label='칩'
        onClick={handleClick}
        leadingIcon={{ iconName: 'check', alt: '체크' }}
        trailingIcon={{ iconName: 'close', alt: '닫기' }}
        leadingClick={leadingClick}
        trailingClick={trailingClick}
      />,
    );
    // Chip 전체 클릭
    fireEvent.click(screen.getByText('칩'));
    expect(handleClick).toHaveBeenCalled();

    // leadingIcon 클릭
    fireEvent.click(screen.getByLabelText('체크'));
    expect(leadingClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1); // leadingIcon 클릭 시 onClick은 추가로 호출되지 않아야 함

    // trailingIcon 클릭
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(trailingClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1); // trailingIcon 클릭 시 onClick은 추가로 호출되지 않아야 함
  });
});
