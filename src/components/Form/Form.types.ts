import type { InputHTMLAttributes, ReactElement, TextareaHTMLAttributes } from 'react';

import type { ChipGroupProps } from '@/components/ChipGroup/ChipGroup.types';
import type { IconProps } from '@/components/Icon/Icon.types';
import type { MenuProps } from '@/components/Menu/Menu.types';
import type { TooltipPlacement, TooltipProps } from '@/components/Tooltip/Tooltip.types';

export type FormSize = 's' | 'm' | 'l';

/** Form 상단 Label 관련 타입  */
interface FormLabelProps {
  /** 상단 라벨 텍스트 */
  labelText?: string;
  /** 상단 라벨 툴팁 노출 여부 */
  isTooltip?: boolean;
  tooltipProps?: TooltipProps;
}
interface ExtendTooltipProps {
  tooltipLabel?: string;
  tooltipSize?: 's' | 'm';
  tooltipVariants?: 'bk' | 'wt';
  tooltipArrow?: boolean;
  tooltipPlacement?: TooltipPlacement;
}
/** Form 하단 Helper 관련 타입  */
interface FormHelperProps {
  /** 하단 description 텍스트 */
  helperText?: string;
  /** 최대 글자 입력 수 */
  maxCount?: number;
}

interface FormBaseProps extends FormLabelProps, FormHelperProps {
  /** 입력값 변경 핸들러 */
  onChange?(value: string): void;
  /** negative 여부 */
  negative?: boolean;
}

/** TextFiled 타입 */
interface TextfieldProps
  extends FormBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** 키보드 이벤트 핸들러 */
  onEnter?(value: string): void;
  /** 입력창 사이즈  / default : L */
  size?: FormSize;
  /** 우측 버튼명 */
  trailingBtnText?: string;
  /** 우측 버튼 클릭 핸들러 */
  trailingBtnHandler?(): void;
  /** 입력 창 좌측 아이콘  */
  leadingIcon?: IconProps;
  /** 입력창 우측 아이콘 및 텍스트  */
  trailingContent1?: string | ReactElement;
  /** 입력창 우측 아이콘 및 텍스트  */
  trailingContent2?: string | ReactElement;
}

type TextareaProps = FormBaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

interface DropdownProps extends MenuProps, FormLabelProps, Omit<FormHelperProps, 'maxCount'> {
  /** disabled 여부 */
  disabled?: boolean;
  /** negative 여부 */
  negative?: boolean;
  /** placehoder 값 */
  placeholder?: string;
  chipProps?: ChipGroupProps;
}

export type {
  FormLabelProps,
  FormHelperProps,
  FormBaseProps,
  TextfieldProps,
  TextareaProps,
  DropdownProps,
  ExtendTooltipProps,
};
