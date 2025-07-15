import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement =
  | 'up-left'
  | 'up-center'
  | 'up-right'
  | 'down-left'
  | 'down-center'
  | 'down-right'
  | 'left-up'
  | 'left-center'
  | 'left-down'
  | 'right-up'
  | 'right-center'
  | 'right-down';

export interface TooltipProps {
  children: ReactNode;
  // default: bk
  variants?: 'bk' | 'wt';
  // default: s
  size?: 's' | 'm';
  // label의 오른쪽 상단에 위치한 버튼
  trailingButton?: ReactElement;
  // label의 하단에 위치한 버튼
  actionButton?: ReactElement;
  // tooltip의 텍스트
  label?: string;
  // 툴팁 화살표의 유무로 default: true
  arrow?: boolean;
  // arrow 위치값, default: down-left
  placement?: TooltipPlacement;

  /** 외부에서 데이터 컨트롤 */
  open?: boolean;
  /** 툴팁이 열릴 때 실행 */
  onOpen?: () => void;
  /** 툴팁이 닫힐 때 실행 */
  onClose?: () => void;
  arrowDistance?: number;
}
