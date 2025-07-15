import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Textfield from './Textfield';

// 공통 props
const baseProps = {
  value: '',
  onChange: vi.fn(),
};

describe('Textfield UI', () => {
  it('labelText가 있으면 라벨이 렌더링된다', () => {
    render(<Textfield {...baseProps} labelText='이름' />);
    expect(screen.getByText('이름')).toBeInTheDocument();
  });

  it('helperText가 있으면 하단 텍스트가 렌더링된다', () => {
    render(<Textfield {...baseProps} helperText='도움말' />);
    expect(screen.getByText('도움말')).toBeInTheDocument();
  });

  it('maxCount가 있으면 FormHelper에 글자 수가 표시된다', () => {
    render(<Textfield {...baseProps} value='1234' maxCount={10} />);
    expect(screen.getByText('4/10')).toBeInTheDocument();
  });

  it('disabled가 true면 input창이 비활성화된다', () => {
    render(<Textfield {...baseProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('negative가 true면 negative 스타일이 적용된다', () => {
    const { container } = render(<Textfield {...baseProps} negative />);
    expect(container.querySelector('.negative')).toBeTruthy();
  });

  it('trailingBtnText가 있으면 우측 버튼이 렌더링된다', () => {
    render(<Textfield {...baseProps} trailingBtnText='추가' />);
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();
  });

  it('leadingIcon이 있으면 좌측 아이콘이 렌더링된다', () => {
    render(<Textfield {...baseProps} leadingIcon={{ iconName: 'search' }} />);
    expect(document.querySelector('i')).toBeTruthy();
  });

  it('isTooltip이 true면 툴팁 아이콘이 렌더링된다', () => {
    render(<Textfield {...baseProps} isTooltip />);
    expect(document.querySelector('i')).toBeInTheDocument();
  });

  it('tooltipProps가 있으면 툴팁 텍스트가 렌더링된다', async () => {
    render(<Textfield {...baseProps} isTooltip tooltipProps={{ label: '툴팁', children: '' }} />);
    const icon = screen.getByTestId('form-label-tooltip');
    await userEvent.hover(icon);
    expect(await screen.findByText('툴팁')).toBeInTheDocument();
  });
});

describe('Textfield 기능', () => {
  it('trailingBtnText가 있고 trailingBtnHandler가 없거나 함수가 아니면 warn이 호출된다', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textfield {...baseProps} trailingBtnText='추가' />);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'trailingBtnText는 할당했지만 trailingBtnHandler는 할당하지 않았습니다',
      ),
      'color: orange;',
    );
    render(<Textfield {...baseProps} trailingBtnText='추가' trailingBtnHandler={123 as any} />);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'trailingBtnText는 할당했지만 trailingBtnHandler는 할당하지 않았습니다',
      ),
      'color: orange;',
    );
    warnSpy.mockRestore();
  });
  it('onChange가 호출되고, maxCount를 초과하면 잘린 값이 전달된다', () => {
    const handleChange = vi.fn();
    render(<Textfield {...baseProps} onChange={handleChange} maxCount={5} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abcdef' } });
    expect(handleChange).toHaveBeenCalledWith('abcde');
  });

  it('disabled면 input이 비활성화된다', () => {
    render(<Textfield {...baseProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('trailingBtnHandler가 버튼 클릭시 호출된다', () => {
    const handler = vi.fn();
    render(<Textfield {...baseProps} trailingBtnText='추가' trailingBtnHandler={handler} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalled();
  });

  it('value값이 반영된다', () => {
    render(<Textfield {...baseProps} value='hello' />);
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });
});
