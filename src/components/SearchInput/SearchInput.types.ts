import type { IconProps } from '@/components/Icon/Icon.types';

type SearchInputSize = 's' | 'm' | 'l';

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** 입력값 변경 핸들러 */
  onChange?(value: string): void;
  /** 키보드 이벤트 핸들러 */
  onEnter?(value: string): void;
  /** 검색어 입력란의 크기 */
  size?: SearchInputSize;
  /** 입력창 우측 아이콘 및 텍스트  */
  trailingContent?: IconProps;
  /** 입력창 좌측 뒤로가기 버튼  */
  backButton?(): void;
  /** 입력창 우측 닫기 버튼  */
  closeButton?(): void;
  /** 입력창 좌측 아이콘 이벤트 핸들러 */
  leadingBtnHandler?: () => void;
}

export type { SearchInputSize, SearchInputProps };
