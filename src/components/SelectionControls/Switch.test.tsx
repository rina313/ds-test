import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import type { SwitchProps } from './Selection.types';
import Switch from './Switch';

describe('Switch', () => {
  const onClick = vi.fn();
  const renderSwitch = (props: Partial<SwitchProps> = {}) => {
    const defaultProps: SwitchProps = {
      on: false,
      onClick,
      size: 'm',
      disabled: false,
      label: '테스트 스위치',
      ...props,
    };
    return render(<Switch {...defaultProps} />);
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  it('label이 있으면 렌더링된다', () => {
    renderSwitch({ label: '라벨' });
    expect(screen.getByText('라벨')).toBeInTheDocument();
  });

  it('on이 true면 on 클래스가 적용된다', () => {
    const { container } = renderSwitch({ on: true });
    const wrapper = container.querySelector('.switch-wrapper');
    expect(wrapper?.className).toContain('on');
  });

  it('disabled가 true면 disabled 클래스가 적용되고 클릭해도 onClick이 호출되지 않는다', () => {
    const { container } = renderSwitch({ disabled: true });
    const wrapper = container.querySelector('.switch-wrapper') as HTMLElement;
    expect(wrapper.className).toContain('disabled');
    fireEvent.click(wrapper);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('스위치 클릭 시 onClick이 호출된다', () => {
    renderSwitch();
    const wrapper = screen
      .getByText('테스트 스위치')
      .parentElement?.querySelector('.switch-wrapper') as HTMLElement;
    fireEvent.click(wrapper);
    expect(onClick).toHaveBeenCalled();
  });

  it('label 클릭 시 onClick이 호출된다', () => {
    renderSwitch({ label: '라벨' });
    const label = screen.getByText('라벨');
    fireEvent.click(label);
    expect(onClick).toHaveBeenCalled();
  });
});
