import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Radio from './Radio';
import type { RadioProps } from './Selection.types';

describe('Radio', () => {
  const onClick = vi.fn();
  const renderRadio = (props: Partial<RadioProps> = {}) => {
    const defaultProps: RadioProps = {
      checked: false,
      onClick,
      label: '테스트 라디오',
      disabled: false,
      ...props,
    };
    return render(<Radio {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('label이 렌더링된다', () => {
    renderRadio({ label: '라디오라벨' });
    expect(screen.getByText('라디오라벨')).toBeInTheDocument();
  });

  it('checked가 true면 checked 클래스가 적용된다', () => {
    const { container } = renderRadio({ checked: true });
    const wrapper = container.querySelector('.radio-wrapper');
    expect(wrapper?.className).toContain('checked');
  });

  it('disabled가 true면 disabled 클래스가 적용되고 클릭해도 onClick이 호출되지 않는다', () => {
    const { container } = renderRadio({ disabled: true });
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('disabled');
    fireEvent.click(root);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('클릭 시 onClick이 호출된다', () => {
    const { container } = renderRadio();
    const root = container.querySelector('.radio-container') as HTMLElement;
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalled();
  });
});
