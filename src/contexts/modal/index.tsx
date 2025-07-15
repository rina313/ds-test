import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';

import type { ModalOptions } from '@/components/Modal/Modal.types';
import ModalContainer from '@/components/Modal/ModalContainer';

interface ModalContextValue {
  openModal: (props: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * ModalProvider
 * - 모달 상태를 전역에서 관리할 수 있도록 컨텍스트를 제공하는 Provider 컴포넌트
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalOptions | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => setModal(null), []);

  const openModal = useCallback(
    (props: ModalOptions) => {
      setModal({
        ...props,
        onClose: () => {
          props.onClose?.();
          closeModal();
        },
      });
    },
    [closeModal],
  );

  // ESC 키로 닫기
  useEffect(() => {
    if (!modal || (modal && modal.closeOnOverlayClick === false)) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal, closeModal]);

  // 모달이 열릴 때 포커스 트랩 적용 (간단 버전)
  // 모달이 닫힐 때 이전 포커스 복원
  useEffect(() => {
    if (!modal || !modalRef.current) return;
    const prevActive = document.activeElement as HTMLElement | null;
    modalRef.current.focus();
    return () => {
      prevActive?.focus();
    };
  }, [modal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal &&
        typeof window !== 'undefined' &&
        createPortal(<ModalContainer modal={modal} modalRef={modalRef} />, document.body)}
    </ModalContext.Provider>
  );
};

/**
 * useModal
 * - ModalProvider 하위에서 모달 열기/닫기 함수를 사용할 수 있는 커스텀 훅
 * - Provider 외부에서 사용 시 에러 발생
 */
export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
};
