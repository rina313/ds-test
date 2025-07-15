export type CounterSize = 's' | 'm';

interface BasePaginationProps {
  /** 총 페이지 숫자 */
  totalPage: number;
  /** 현재 페이지 숫자 */
  currentPage: number;
}
interface CounterProps extends BasePaginationProps {
  /** 카운터 사이즈 */
  size?: CounterSize;
}

interface IndicatorProps {
  /** 총 Dot 갯수 */
  totalCount: number;
  /** 선택된 Dot의 `index` */
  selectedIdx: number;
  /** Dot 클릭 시 이벤트 핸들러 */
  onClick(idx: number): void;
}

interface NavigationProps extends BasePaginationProps {
  /** 한번에 보여지는 페이지 갯수 (default: 10) */
  perPage?: number;
  /** 버튼 클릭 시 실행되는 페이지네이션 이벤트 */
  onClick(page: number): void;
}

export type { CounterProps, IndicatorProps, NavigationProps };
