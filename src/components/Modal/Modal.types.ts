import type { ReactNode } from 'react';

export interface ModalProps {
  disabledHeader?: boolean;
  title?: string;
  onPrev?: () => void;
  onClose?: () => void;
  children?: ReactNode;
  size?: 'm' | 'l';
  actionArea?: ReactNode;
}

export interface ModalOptions extends ModalProps {
  /** 오버레이 클릭 시 모달 닫기 허용 여부 */
  closeOnOverlayClick?: boolean;
}
