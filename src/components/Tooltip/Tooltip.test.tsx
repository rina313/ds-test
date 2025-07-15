import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Tooltip from './Tooltip';

const CHILD_TEXT = '타겟';
const LABEL_TEXT = '툴팁 라벨';

describe('Tooltip', () => {
  it('children만 있을 때 툴팁이 보이지 않음', () => {
    render(<Tooltip>{CHILD_TEXT}</Tooltip>);
    expect(screen.getByText(CHILD_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(LABEL_TEXT)).not.toBeInTheDocument();
  });

  it('hover 시 label이 나타남', () => {
    render(<Tooltip label={LABEL_TEXT}>{CHILD_TEXT}</Tooltip>);
    const target = screen.getByText(CHILD_TEXT).parentElement;
    fireEvent.mouseEnter(target!);
    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument();
    fireEvent.mouseLeave(target!);
    expect(screen.queryByText(LABEL_TEXT)).not.toBeInTheDocument();
  });

  it('open prop이 true면 항상 툴팁이 보임', () => {
    render(
      <Tooltip label={LABEL_TEXT} open>
        {CHILD_TEXT}
      </Tooltip>,
    );
    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument();
  });

  it('open prop이 false면 툴팁이 보이지 않음', () => {
    render(
      <Tooltip label={LABEL_TEXT} open={false}>
        {CHILD_TEXT}
      </Tooltip>,
    );
    expect(screen.queryByText(LABEL_TEXT)).not.toBeInTheDocument();
  });

  it('trailingButton, actionButton, arrow 렌더링', () => {
    render(
      <Tooltip
        label={LABEL_TEXT}
        open
        trailingButton={<button>트레일링</button>}
        actionButton={<button>액션</button>}
      >
        {CHILD_TEXT}
      </Tooltip>,
    );
    expect(screen.getByText('트레일링')).toBeInTheDocument();
    expect(screen.getByText('액션')).toBeInTheDocument();
    // arrow(svg) 존재 확인
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('arrow=false면 화살표가 렌더링되지 않음', () => {
    render(
      <Tooltip label={LABEL_TEXT} open arrow={false}>
        {CHILD_TEXT}
      </Tooltip>,
    );
    expect(document.querySelector('svg')).not.toBeInTheDocument();
  });

  it('onOpen, onClose 콜백이 정상 동작', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Tooltip label={LABEL_TEXT} onOpen={onOpen} onClose={onClose}>
        {CHILD_TEXT}
      </Tooltip>,
    );
    const target = screen.getByText(CHILD_TEXT).parentElement;
    fireEvent.mouseEnter(target!);
    expect(onOpen).toHaveBeenCalled();
    fireEvent.mouseLeave(target!);
    expect(onClose).toHaveBeenCalled();
  });

  it('기본 variants는 bk이고 variants prop에 따라 클래스가 적용된다', () => {
    const { container, rerender } = render(
      <Tooltip label={LABEL_TEXT} open>
        {CHILD_TEXT}
      </Tooltip>,
    );
    let tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('bk');

    rerender(
      <Tooltip label={LABEL_TEXT} open variants='wt'>
        {CHILD_TEXT}
      </Tooltip>,
    );
    tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('wt');
  });

  it('기본 size는 s이고 size prop에 따라 클래스가 적용된다', () => {
    const { container, rerender } = render(
      <Tooltip label={LABEL_TEXT} open>
        {CHILD_TEXT}
      </Tooltip>,
    );
    let tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('s');

    rerender(
      <Tooltip label={LABEL_TEXT} open size='m'>
        {CHILD_TEXT}
      </Tooltip>,
    );
    tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('m');
  });

  it('기본 placement는 down-left이고 placement prop에 따라 클래스가 적용된다', () => {
    const { container, rerender } = render(
      <Tooltip label={LABEL_TEXT} open>
        {CHILD_TEXT}
      </Tooltip>,
    );
    let tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('down-left');

    rerender(
      <Tooltip label={LABEL_TEXT} open placement='up-center'>
        {CHILD_TEXT}
      </Tooltip>,
    );
    tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('up-center');
  });

  it('arrowDistance prop으로 화살표 거리를 설정할 수 있다', () => {
    const { container } = render(
      <Tooltip label={LABEL_TEXT} open arrowDistance={10}>
        {CHILD_TEXT}
      </Tooltip>,
    );
    const wrapper = container.querySelector('.wrapper') as HTMLElement;
    expect(wrapper.style.getPropertyValue('--arrow-distance')).toBe('10px');
  });

  it('label이 없으면 다른 prop이 있어도 툴팁이 렌더링되지 않는다', () => {
    render(
      <Tooltip open trailingButton={<button>트레일링</button>} actionButton={<button>액션</button>}>
        {CHILD_TEXT}
      </Tooltip>,
    );
    expect(screen.queryByText('트레일링')).not.toBeInTheDocument();
    expect(screen.queryByText('액션')).not.toBeInTheDocument();
  });

  it('trailingButton이 없으면 trailing 영역이 렌더링되지 않는다', () => {
    const { container } = render(
      <Tooltip label={LABEL_TEXT} open>
        {CHILD_TEXT}
      </Tooltip>,
    );
    const trailing = container.querySelector('.trailing');
    expect(trailing).not.toBeInTheDocument();
  });

  it('actionButton이 없으면 action 영역이 렌더링되지 않는다', () => {
    const { container } = render(
      <Tooltip label={LABEL_TEXT} open>
        {CHILD_TEXT}
      </Tooltip>,
    );
    const action = container.querySelector('.action');
    expect(action).not.toBeInTheDocument();
  });
});
