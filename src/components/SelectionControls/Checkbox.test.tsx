import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Checkbox from './Checkbox';
import type { CheckboxProps } from './Selection.types';

describe('Checkbox', () => {
  const onClick = vi.fn();
  const renderCheckbox = (props: Partial<CheckboxProps> = {}) => {
    const defaultProps: CheckboxProps = {
      checked: false,
      onClick,
      label: '테스트 체크박스',
      disabled: false,
      ...props,
    };
    return render(<Checkbox {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('label이 렌더링된다', () => {
    renderCheckbox({ label: '라벨' });
    expect(screen.getByText('라벨')).toBeInTheDocument();
  });

  it('checked가 true면 checked 클래스가 적용된다', () => {
    const { container } = renderCheckbox({ checked: true });
    const wrapper = container.querySelector('.checkbox-wrapper');
    expect(wrapper?.className).toContain('checked');
  });

  it('disabled가 true면 disabled 클래스가 적용되고 클릭해도 onClick이 호출되지 않는다', () => {
    const { container } = renderCheckbox({ disabled: true });
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('disabled');
    fireEvent.click(root);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('클릭 시 onClick이 호출된다', () => {
    const { container } = renderCheckbox();
    const root = container.querySelector('.checkbox-container') as HTMLElement;
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalled();
  });
});
