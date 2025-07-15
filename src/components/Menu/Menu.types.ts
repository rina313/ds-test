import type { ReactElement } from 'react';

import type { IconProps } from '@/components/Icon/Icon.types';
import type { Checkbox, Radio } from '@/components/SelectionControls';

/** 메뉴 사이즈 타입 */
type MenuSize = 's' | 'm' | 'l';

/** 라벨 내부에 들어갈 수 있는 컴포넌트 타입 */
type AllowedContentType =
  | IconProps
  | ReactElement<React.ComponentProps<typeof Radio>, typeof Radio>
  | ReactElement<React.ComponentProps<typeof Checkbox>, typeof Checkbox>
  | ReactElement<object, 'i'>;

/** 공통 속성 타입 */
interface MenuSharedProps {
  /** 메뉴 사이즈 */
  size?: MenuSize;
  /** 메뉴 최대 높이 */
  maxHeight?: number;
  /** 다중 선택 여부 */
  multiSelect?: boolean;
}

/** 메뉴 Props (최상위 Menu 컴포넌트) */
interface MenuProps extends MenuSharedProps {
  /** 메뉴 리스트 */
  menus: MenuItemProps[];
  /** 선택 기능 활성화 */
  selectable?: boolean;
  /** 선택된 메뉴 옵션 */
  selectedIds?: string[];
  /** 선택 변경 콜백 */
  onSelectionChange?: (ids: string[]) => void;
  /** 하단 active 영역 */
  activeArea?: ReactElement;
}

/** MenuList 컴포넌트에서 사용하는 Props */
interface MenuListProps extends MenuSharedProps, React.HTMLAttributes<HTMLDivElement> {
  menus: MenuItemProps[];
  className?: string;
  selectedIds?: string[];
  onItemSelect?: (itemId: string) => void;
  activeArea?: ReactElement;
}

/** 개별 메뉴 항목 Props */
interface MenuItemProps extends MenuSharedProps {
  /** 고유 ID */
  id: string;
  /** 라벨 텍스트 */
  label: string;
  /** 라벨 설명 */
  description?: string;
  /** 좌측 콘텐츠 */
  leadingContent?: AllowedContentType;
  /** 우측 아이콘 */
  trailingIcon?: IconProps;
  /** 상단 타이틀 */
  title?: string;
  /** 하단 구분선 여부 */
  hasDivider?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 하위 메뉴 */
  subMenu?: MenuItemProps[];

  // 내부 관리용 props
  isSelected?: boolean;
  selectedIds?: string[];
  onSelect?: (itemId: string) => void;
  onItemSelect?: (itemId: string) => void;
  className?: string;
}
export type { MenuSize, MenuItemProps, MenuProps, MenuListProps };
