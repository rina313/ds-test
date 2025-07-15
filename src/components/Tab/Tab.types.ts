import type { ReactElement } from 'react';

export type TabSize = 's' | 'm';
interface BaseTabProps {
  /** 옵션 리스트 */
  options: string[] | ReactElement[];
  /** 선택된 옵션의 `index` 값 */
  selectedIdx: number;
  /** 옵션 클릭 시 이벤트 핸들러 */
  onClick(idx: number): void;
  /** 버튼 사이즈 */
  size?: TabSize;
}

interface TabProps extends BaseTabProps {
  /** 좌 ・ 우 여백 여부 */
  vertical?: boolean;
  /** 상 ・ 하 여백 여부 */
  horizontal?: boolean;
}

interface SegmentedControlProps extends BaseTabProps {
  maxWidth?: string;
}

export type { TabProps, SegmentedControlProps };
