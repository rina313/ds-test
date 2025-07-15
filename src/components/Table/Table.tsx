import { useState, type ReactNode } from 'react';

import type { PaginationState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { clsx } from 'clsx';

import style from './Table.module.scss';
import type { TableProps } from './Table.types';
import { EmptyState } from '../EmptyState';
import { Navigation } from '../Pagination';

/** Form > Table 컴포넌트
 * @description 데이터를 행과 열로 구성하여 정보를 정리합니다. 필요한 경우 Detach해서 쓸 수 있으며, 실제 구현은 라이브러리를 사용합니다.
 */
export default function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className = '',
  fixCell = '',
  size = 'm',
  maxWidth,
  maxHeight,
  isPagination = false,
  paginationProps,
  title = '',
  subTitle = '',
  button,
}: TableProps<T>): ReactNode {
  const { totalPage = 1, currentPage = 1, perPage = 10, onClick } = paginationProps || {};
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: perPage,
  });

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    pageCount: isPagination ? totalPage : undefined,
    ...(isPagination
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          state: {
            pagination,
          },
        }
      : {}),
  });
  return (
    <div className={style.table}>
      <div
        className={clsx(
          style['table-container'],
          className,
          maxWidth && style['max-width'],
          maxHeight && style['max-height'],
        )}
        style={{ maxWidth, maxHeight }}
      >
        <table className={clsx(style['table-wrapper'], style[`size-${size}`])}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={style['table-header']}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} style={{ width: header.column.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title={title} subTitle={subTitle} button={button} />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={style['table-row']} onClick={() => onRowClick?.(row)}>
                  {row.getVisibleCells().map((cell, idx, allCells) => {
                    const fixedIndex = allCells.findIndex((c) => c.column.id === fixCell);
                    const isFixed = cell.column.id === fixCell;
                    const isBeforeFixed = idx < fixedIndex;
                    return (
                      <td
                        key={cell.id}
                        className={clsx(
                          isFixed && style['fixed-cell'],
                          isBeforeFixed && style['before-fixed-cell'],
                        )}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isPagination && (
        <div className={style['pagination-container']}>
          <Navigation
            totalPage={totalPage}
            currentPage={table.getState().pagination.pageIndex + 1}
            perPage={perPage}
            onClick={(page) => {
              onClick?.(page);
              setPagination((prev) => ({
                ...prev,
                pageIndex: page - 1,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
}
