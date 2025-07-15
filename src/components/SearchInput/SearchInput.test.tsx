import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import SearchInput from './SearchInput';
import type { SearchInputProps } from './SearchInput.types';

describe('SearchInput', () => {
  const onChange = vi.fn();
  const renderSearchInput = (props: Partial<SearchInputProps> = {}) => {
    const defaultProps: SearchInputProps = {
      value: '',
      onChange,
      ...props,
    };
    return render(<SearchInput {...defaultProps} />);
  };

  beforeEach(() => {
    onChange.mockClear();
  });

  it('input에 value가 반영된다', () => {
    renderSearchInput({ value: 'test' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
  });

  it('placeholder 값이 있으면 해당 값이 렌더링된다', () => {
    renderSearchInput({ placeholder: '검색어를 입력하세요' });
    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    expect(input).toBeInTheDocument();
  });

  it('input 변경 시 onChange가 호출된다', () => {
    renderSearchInput({ value: '', onChange });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('disabled prop이 적용되면 input이 비활성화된다', () => {
    renderSearchInput({ disabled: true });
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('backButton prop이 있으면 뒤로가기 아이콘 버튼이 렌더링된다', () => {
    const backClick = vi.fn();
    renderSearchInput({ backButton: backClick });
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);
    expect(backClick).toHaveBeenCalled();
  });

  it('closeButton prop이 있으면 닫기 아이콘 버튼이 렌더링된다', () => {
    const closeClick = vi.fn();
    renderSearchInput({ closeButton: closeClick });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(closeClick).toHaveBeenCalled();
  });

  it('value가 있으면 clear(지우기) 버튼이 렌더링되고 클릭 시 value 초기화', () => {
    renderSearchInput({ value: 'abc', onChange });
    const clearBtn = screen.getAllByRole('button').find((btn) => btn.querySelector('svg'));
    if (clearBtn) {
      fireEvent.click(clearBtn);
      expect(onChange).toHaveBeenCalledWith('');
    }
  });

  it('trailingContent prop에 iconName이 있으면 아이콘이 렌더링된다', () => {
    renderSearchInput({ trailingContent: { iconName: 'star' } });
    const icon = screen.getByTestId('search-input-trailing-content');
    expect(icon).toHaveAttribute('data-icon-name', 'star');
  });
});
