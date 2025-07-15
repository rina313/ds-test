import { useEffect, type ReactElement } from 'react';

import Modal from './Modal';
import style from './Modal.module.scss';
import type { ModalOptions } from './Modal.types';

/**
 * ModalContainer 컴포넌트
 * - 모달의 레이아웃, 애니메이션, 모달 외부 영역클릭시 닫기 기능을 처리
 */
const ModalContainer = ({
  modal,
  modalRef,
}: {
  modal: ModalOptions;
  modalRef: React.RefObject<HTMLDivElement>;
}): ReactElement => {
  const { closeOnOverlayClick = true, onClose, ...modalProps } = modal;

  useEffect(() => {
    if (!closeOnOverlayClick || !onClose) return;

    const handleClick = (e: MouseEvent) => {
      if (!modalRef.current) return;
      // 모달 내부 클릭이면 무시
      if (modalRef.current.contains(e.target as Node)) return;
      onClose();
    };

    document.addEventListener('mousedown', handleClick, true); // 캡처 단계
    return () => {
      document.removeEventListener('mousedown', handleClick, true);
    };
  }, [closeOnOverlayClick, onClose, modalRef]);

  return (
    <>
      <div className={style.overlay} aria-hidden='true' tabIndex={-1} style={{ zIndex: 1000 }} />
      <div className={style['container-wrapper']} style={{ zIndex: 1010 }}>
        <div
          className={style['container-modal']}
          role='dialog'
          aria-modal='true'
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <Modal {...modalProps} onClose={onClose} ref={modalRef} />
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
