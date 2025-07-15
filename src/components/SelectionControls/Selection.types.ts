import type { ReactNode } from 'react';

export type SwitchSize = 's' | 'm';

interface BaseSelectionPops {
  /** 비활성화 여부 */
  disabled?: boolean;
  /** Label 영역 */
  label?: ReactNode;
}

interface CheckboxProps extends BaseSelectionPops {
  /** Checkbox 선택 여부 */
  checked: boolean;
  /** Checkbox 클릭 시 이벤트 핸들러 */
  onClick?(): void;
}

interface RadioProps extends BaseSelectionPops {
  /** Radio 선택 여부 */
  checked: boolean;
  /** Radio 클릭 시 이벤트 핸들러 */
  onClick?(): void;
}

interface SwitchProps extends BaseSelectionPops {
  /** 스위치 활성화 여부 */
  on: boolean;
  /** 스위치 클릭 이벤트 핸들러 */
  onClick?(): void;
  /** 스위치 사이즈 */
  size?: SwitchSize;
}

export type { CheckboxProps, RadioProps, SwitchProps };
