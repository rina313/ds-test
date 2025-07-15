import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ModalProvider, useModal } from '@/contexts/modal';

import Modal from './Modal';

const TITLE = '모달 타이틀';
const CONTENT = '모달 내용';
const ACTION = '액션버튼';

// ModalProvider + useModal 테스트용 컴포넌트
function ModalTestButton() {
  const { openModal, closeModal } = useModal();
  return (
    <>
      <button
        onClick={() =>
          openModal({ title: TITLE, children: CONTENT, actionArea: <button>{ACTION}</button> })
        }
      >
        모달 열기
      </button>
      <button onClick={closeModal}>모달 닫기</button>
    </>
  );
}

describe('Modal', () => {
  it('size prop에 따라 className이 적용된다', () => {
    const { container } = render(<Modal size='l'>{CONTENT}</Modal>);
    expect(container.firstChild).toHaveClass('l');
  });

  it('기본 size는 m이다', () => {
    const { container } = render(<Modal>{CONTENT}</Modal>);
    expect(container.firstChild).toHaveClass('m');
  });

  it('title prop이 있으면 헤더에 제목이 렌더링된다', () => {
    render(<Modal title={TITLE}>{CONTENT}</Modal>);
    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('actionArea prop이 있으면 액션 영역이 렌더링된다', () => {
    render(<Modal actionArea={<button>{ACTION}</button>}>{CONTENT}</Modal>);
    expect(screen.getByText(ACTION)).toBeInTheDocument();
  });

  it('children이 정상적으로 렌더링된다', () => {
    render(<Modal>{CONTENT}</Modal>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });

  it('onPrev prop이 있으면 이전 버튼이 렌더링되고 클릭 시 콜백이 호출된다', () => {
    const onPrev = vi.fn();
    render(<Modal onPrev={onPrev}>{CONTENT}</Modal>);
    fireEvent.click(screen.getByLabelText('이전'));
    expect(onPrev).toHaveBeenCalled();
  });

  it('onClose prop이 있으면 닫기 버튼 클릭 시 콜백이 호출된다', () => {
    const onClose = vi.fn();
    render(<Modal onClose={onClose}>{CONTENT}</Modal>);
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(onClose).toHaveBeenCalled();
  });

  it('disabledHeader가 true면 헤더가 렌더링되지 않는다', () => {
    render(<Modal disabledHeader>{CONTENT}</Modal>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('ModalProvider + useModal로 모달 열고 닫기', () => {
    render(
      <ModalProvider>
        <ModalTestButton />
      </ModalProvider>,
    );
    fireEvent.click(screen.getByText('모달 열기'));
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
    // 닫기 버튼 클릭
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(screen.queryByText(TITLE)).not.toBeInTheDocument();
  });

  it('ESC 키로 모달 닫힘', () => {
    render(
      <ModalProvider>
        <ModalTestButton />
      </ModalProvider>,
    );
    fireEvent.click(screen.getByText('모달 열기'));
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByText(TITLE)).not.toBeInTheDocument();
  });

  it('오버레이 클릭 시 closeOnOverlayClick=true면 닫힘', () => {
    render(
      <ModalProvider>
        <ModalTestButton />
      </ModalProvider>,
    );
    fireEvent.click(screen.getByText('모달 열기'));
    const overlay = document.querySelector('[aria-hidden="true"]');
    fireEvent.mouseDown(overlay!);
    expect(screen.queryByText(TITLE)).not.toBeInTheDocument();
  });

  it('closeOnOverlayClick=false면 오버레이를 클릭하거나 ESC키를 눌러도 닫히지 않는다', () => {
    function CustomBtn() {
      const { openModal } = useModal();
      return (
        <button
          onClick={() => openModal({ title: TITLE, children: CONTENT, closeOnOverlayClick: false })}
        >
          open
        </button>
      );
    }
    render(
      <ModalProvider>
        <CustomBtn />
      </ModalProvider>,
    );
    fireEvent.click(screen.getByText('open'));
    const overlay = document.querySelector('[aria-hidden="true"]');
    fireEvent.mouseDown(overlay!);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('모달이 열렸을 때 올바른 accessibility 속성들이 적용된다', () => {
    render(
      <ModalProvider>
        <ModalTestButton />
      </ModalProvider>,
    );
    fireEvent.click(screen.getByText('모달 열기'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('tabIndex', '-1');

    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });

  it('forwardRef가 올바르게 작동한다', () => {
    const mockRef = { current: null };
    render(<Modal ref={mockRef}>{CONTENT}</Modal>);
    expect(mockRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('내용이 길어서 스크롤이 생기면 scroll-modal 클래스가 적용된다', () => {
    const longContent = 'Very long content '.repeat(100);
    const { container } = render(<Modal>{longContent}</Modal>);

    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 500,
    });

    fireEvent.scroll(container.querySelector('[class*="content-wrapper"]')!);
    expect(container.firstChild).toHaveClass('scroll-modal');
  });
});
