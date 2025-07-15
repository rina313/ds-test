import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Textarea from './Textarea';

const baseProps = {
  value: '',
  onChange: vi.fn(),
};

describe('Textarea UI', () => {
  it('labelText가 있으면 라벨이 렌더링된다', () => {
    render(<Textarea {...baseProps} labelText='설명' />);
    expect(screen.getByText('설명')).toBeInTheDocument();
  });

  it('helperText가 있으면 하단 텍스트가 렌더링된다', () => {
    render(<Textarea {...baseProps} helperText='도움말' />);
    expect(screen.getByText('도움말')).toBeInTheDocument();
  });

  it('maxCount가 있으면 FormHelper에 글자 수가 표시된다', () => {
    render(<Textarea {...baseProps} value='1234' maxCount={10} />);
    expect(screen.getByText('4/10')).toBeInTheDocument();
  });

  it('disabled가 true면 textarea가 비활성화된다', () => {
    render(<Textarea {...baseProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('negative가 true면 negative 스타일이 적용된다', () => {
    const { container } = render(<Textarea {...baseProps} negative />);
    expect(container.querySelector('.negative')).toBeTruthy();
  });

  it('isTooltip이 true면 툴팁 아이콘이 렌더링된다', () => {
    render(<Textarea {...baseProps} isTooltip />);
    expect(document.querySelector('i')).toBeInTheDocument();
  });

  it('tooltipProps가 있으면 툴팁 텍스트가 렌더링된다', async () => {
    render(<Textarea {...baseProps} isTooltip tooltipProps={{ label: '툴팁', children: '' }} />);

    const icon = screen.getByTestId('form-label-tooltip');
    await userEvent.hover(icon);

    expect(await screen.findByText('툴팁')).toBeInTheDocument();
  });
});

describe('Textarea 기능', () => {
  it('value, maxLength, name prop이 textarea에 반영된다', () => {
    render(<Textarea {...baseProps} value='abc' maxCount={5} name='myarea' />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('abc');
    expect(textarea).toHaveAttribute('maxlength', '5');
    expect(textarea).toHaveAttribute('name', 'myarea');
  });

  it('onChange가 호출되고, maxCount를 초과하면 잘린 값이 전달된다', () => {
    const handleChange = vi.fn();
    render(<Textarea value='' onChange={handleChange} maxCount={3} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '12345' } });
    expect(handleChange).toHaveBeenCalledWith('123');
  });

  it('disabled면 input이 비활성화된다', () => {
    render(<Textarea {...baseProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
