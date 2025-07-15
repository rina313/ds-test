import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';

import { SnackBarProvider, useSnackBar } from '@/contexts/snackBar';

import SnackBar from './SnackBar';
import SnackBarContainer from './SnackBarContainer';

const LABEL = '스낵바 메시지';
const TRAILING = '확인';

function SnackBarTestButton() {
  const { showSnackBar, hideSnackBar, hideAllSnackBars } = useSnackBar();
  return (
    <>
      <button onClick={() => showSnackBar({ label: LABEL })}>스낵바 열기</button>
      <button
        onClick={() => {
          const id = showSnackBar({ label: LABEL, trailingButtonLabel: TRAILING });
          hideSnackBar(id);
        }}
      >
        스낵바 닫기
      </button>
      <button onClick={hideAllSnackBars}>모두 닫기</button>
    </>
  );
}

describe('SnackBar', () => {
  it('label이 정상적으로 렌더링된다', () => {
    render(<SnackBar label='스낵바 메시지' />);
    expect(screen.getByText('스낵바 메시지')).toBeInTheDocument();
  });

  it('variants에 따라 아이콘이 자동으로 렌더링된다', () => {
    render(<SnackBar label='성공' variants='success' />);
    expect(screen.getByLabelText('success')).toBeInTheDocument();
    render(<SnackBar label='경고' variants='cautionary' />);
    expect(screen.getByLabelText('cautionary')).toBeInTheDocument();
    render(<SnackBar label='실패' variants='negative' />);
    expect(screen.getByLabelText('negative')).toBeInTheDocument();
  });

  it('variants가 normal이면 아이콘이 렌더링되지 않는다', () => {
    render(<SnackBar label='일반' variants='normal' />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('icon prop이 있으면 커스텀 아이콘이 렌더링된다', () => {
    render(<SnackBar label='커스텀' icon={{ iconName: 'bolt', alt: '커스텀아이콘' }} />);
    expect(screen.getByLabelText('커스텀아이콘')).toBeInTheDocument();
  });

  it('trailingButtonLabel, trailingButtonClick이 있으면 버튼이 렌더링되고 클릭 시 콜백이 호출된다', () => {
    const click = vi.fn();
    render(<SnackBar label='스낵바' trailingButtonLabel='확인' trailingButtonClick={click} />);
    const btn = screen.getByText('확인');
    fireEvent.click(btn);
    expect(click).toHaveBeenCalled();
  });

  it('onClose prop이 있으면 닫기 버튼이 렌더링되고 클릭 시 콜백이 호출된다', () => {
    const onClose = vi.fn();
    render(<SnackBar label='닫기' onClose={onClose} />);
    const closeBtn = screen.getByLabelText('닫기');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('exiting=true면 wrapper에 snackbar-exit 클래스가 적용된다', () => {
    const { container } = render(<SnackBar label='애니메이션' exiting />);
    expect(container.firstChild).toHaveClass('snackbar-exit');
  });

  // provider & hook
  it('showSnackBar로 스낵바가 나타난다', () => {
    render(
      <SnackBarProvider>
        <SnackBarTestButton />
      </SnackBarProvider>,
    );
    fireEvent.click(screen.getByText('스낵바 열기'));
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it('hideSnackBar로 스낵바가 사라진다', () => {
    vi.useFakeTimers();
    render(
      <SnackBarProvider>
        <SnackBarTestButton />
      </SnackBarProvider>,
    );
    fireEvent.click(screen.getByText('스낵바 닫기'));
    // exit 애니메이션 후 사라짐
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('hideAllSnackBars로 모든 스낵바가 사라진다', () => {
    render(
      <SnackBarProvider>
        <SnackBarTestButton />
      </SnackBarProvider>,
    );
    fireEvent.click(screen.getByText('스낵바 열기'));
    fireEvent.click(screen.getByText('스낵바 열기'));
    fireEvent.click(screen.getByText('스낵바 열기'));
    fireEvent.click(screen.getByText('모두 닫기'));
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
  });

  it('자동 닫힘이 정상 동작한다', () => {
    vi.useFakeTimers();
    render(
      <SnackBarProvider>
        <SnackBarTestButton />
      </SnackBarProvider>,
    );
    fireEvent.click(screen.getByText('스낵바 열기'));
    act(() => {
      vi.advanceTimersByTime(4400);
    });
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('trailingButtonLabel이나 onClose가 있으면 자동 닫힘이 작동하지 않는다', () => {
    vi.useFakeTimers();
    function TestComponent() {
      const { showSnackBar } = useSnackBar();
      return (
        <>
          <button onClick={() => showSnackBar({ label: LABEL, trailingButtonLabel: TRAILING })}>
            버튼 있는 스낵바
          </button>
          <button onClick={() => showSnackBar({ label: LABEL, onClose: () => {} })}>
            닫기 버튼 있는 스낵바
          </button>
        </>
      );
    }

    render(
      <SnackBarProvider>
        <TestComponent />
      </SnackBarProvider>,
    );

    fireEvent.click(screen.getByText('버튼 있는 스낵바'));
    fireEvent.click(screen.getByText('닫기 버튼 있는 스낵바'));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getAllByText(LABEL)).toHaveLength(2);
    vi.useRealTimers();
  });

  it('커스텀 duration으로 자동 닫힘 시간을 설정할 수 있다', () => {
    vi.useFakeTimers();
    function TestComponent() {
      const { showSnackBar } = useSnackBar();
      return (
        <button onClick={() => showSnackBar({ label: LABEL, duration: 1000 })}>1초 스낵바</button>
      );
    }

    render(
      <SnackBarProvider>
        <TestComponent />
      </SnackBarProvider>,
    );

    fireEvent.click(screen.getByText('1초 스낵바'));

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('trailingButtonClick 콜백에 id가 전달된다', () => {
    const trailingClick = vi.fn();
    function TestComponent() {
      const { showSnackBar } = useSnackBar();
      return (
        <button
          onClick={() =>
            showSnackBar({
              label: LABEL,
              trailingButtonLabel: TRAILING,
              trailingButtonClick: trailingClick,
            })
          }
        >
          스낵바 열기
        </button>
      );
    }

    render(
      <SnackBarProvider>
        <TestComponent />
      </SnackBarProvider>,
    );

    fireEvent.click(screen.getByText('스낵바 열기'));
    fireEvent.click(screen.getByText(TRAILING));

    expect(trailingClick).toHaveBeenCalledWith(expect.stringContaining('snackbar'));
  });

  it('useSnackBar를 SnackBarProvider 밖에서 사용하면 에러가 발생한다', () => {
    function TestComponent() {
      useSnackBar();
      return <div>Test</div>;
    }

    expect(() => render(<TestComponent />)).toThrow(
      'useSnackBar must be used within a SnackBarProvider',
    );
  });
});

describe('SnackBarContainer', () => {
  it('스낵바가 없으면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<SnackBarContainer snackBars={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('여러 스낵바를 동시에 렌더링할 수 있다', () => {
    const snackBars = [
      { id: '1', label: '첫 번째' },
      { id: '2', label: '두 번째' },
      { id: '3', label: '세 번째' },
    ];

    render(<SnackBarContainer snackBars={snackBars} />);

    expect(screen.getByText('첫 번째')).toBeInTheDocument();
    expect(screen.getByText('두 번째')).toBeInTheDocument();
    expect(screen.getByText('세 번째')).toBeInTheDocument();
  });
});
