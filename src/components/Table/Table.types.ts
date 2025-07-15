import type { ColumnDef, Row } from '@tanstack/react-table';

import type { EmptyStateProps } from '@/components/EmptyState/EmptyState.types';
import type { NavigationProps } from '@/components/Pagination/Pagination.types';

type TableSize = 's' | 'm';

type TableData = Record<string, any>; // 범용 데이터 구조

interface TableProps<T extends TableData> extends EmptyStateProps {
  /** 테이블 데이터 */
  data: T[];
  /** 테이블 컬럼 정의 */
  columns: ColumnDef<T, any>[];
  /** 행 클릭 이벤트 핸들러 */
  onRowClick?: (row: Row<T>) => void;
  /** 테이블 커스텀 클래스 이름 */
  className?: string;
  /** 테이블 크기 */
  size?: TableSize;
  /** 고정할 셀 컬럼명 */
  fixCell?: string;
  /** 페이지네이션 추가 여부  */
  isPagination?: boolean;
  /** 페이지네이션 속성 */
  paginationProps?: NavigationProps;
  /** 테이블 최대 너비 */
  maxWidth?: React.CSSProperties['maxWidth'];
  /** 테이블 최대 높이 */
  maxHeight?: React.CSSProperties['maxHeight'];
}
export type { TableSize, TableData, TableProps };
