import type { IconProps } from '../Icon/Icon.types';

export interface SnackBarProps {
  variants?: 'normal' | 'cautionary' | 'success' | 'negative';
  label?: string;
  icon?: IconProps;
  trailingButtonLabel?: string;
  /**
   * 이벤트 실행 후 스낵바를 닫기 위해선 id값을 전달해 useSnackBar 훅의 hideSnackBar 함수 호출해야 합니다.
   * @param id
   * @returns
   */
  trailingButtonClick?: (id?: string) => void;
  onClose?: () => void;
  /**
   * 스낵바가 닫히는 애니메이션을 적용할 때 true로 설정합니다.
   * @default false
   */
  exiting?: boolean;
}

export interface SnackBarItem extends SnackBarProps {
  id: string;
  /** default 4000ms */
  duration?: number;
}
