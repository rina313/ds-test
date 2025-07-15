import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Table from './Table';
import type { TableProps } from './Table.types';

describe('Table', () => {
  const onRowClick = vi.fn();
  const onClick = vi.fn();
  const columns = [
    {
      id: 'name',
      header: '이름',
      cell: (row: any) => row.getValue('name'),
      accessorKey: 'name',
      size: 100,
    },
    {
      id: 'age',
      header: '나이',
      cell: (row: any) => row.getValue('age'),
      accessorKey: 'age',
      size: 50,
    },
  ];
  const data = [
    { id: '1', name: '홍길동', age: 20 },
    { id: '2', name: '김철수', age: 30 },
  ];
  const renderTable = (props: Partial<TableProps<any>> = {}) => {
    const defaultProps: TableProps<any> = {
      data,
      columns,
      onRowClick,
      className: '',
      size: 'm',
      isPagination: false,
      title: 'empty',
      subTitle: 'no data',
      ...props,
    };
    return render(<Table {...defaultProps} />);
  };

  beforeEach(() => {
    onRowClick.mockClear();
    onClick.mockClear();
  });

  it('헤더와 데이터가 올바르게 렌더링된다', () => {
    renderTable();
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('나이')).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
  });

  it('row 클릭 시 onRowClick이 호출된다', () => {
    renderTable();
    const rows = screen.getAllByRole('row');
    // 첫 번째 데이터 row 클릭 (헤더 제외)
    fireEvent.click(rows[1]);
    expect(onRowClick).toHaveBeenCalled();
  });

  it('isPagination이 true면 Navigation이 렌더링된다', () => {
    renderTable({
      isPagination: true,
      paginationProps: { totalPage: 2, currentPage: 1, perPage: 1, onClick },
    });
    // chevron-right 아이콘이 있는 버튼이 렌더링되는지 확인 (aria-label이나 class로)
    const buttons = screen.getAllByRole('button');
    // 마지막 버튼(다음 페이지 버튼)에 chevron-right 아이콘이 포함되어 있는지 확인
    const nextBtn = buttons[buttons.length - 1];
    const icon = nextBtn.querySelector('i.fa-chevron-right');
    expect(icon).toBeInTheDocument();
  });

  it('데이터가 없으면 EmptyState가 렌더링된다', () => {
    renderTable({ data: [] });
    expect(screen.getByText('empty')).toBeInTheDocument();
    expect(screen.getByText('no data')).toBeInTheDocument();
  });

  it('className, size, maxWidth, maxHeight prop이 스타일에 반영된다', () => {
    const { container } = renderTable({
      className: 'custom',
      size: 'm',
      maxWidth: 300,
      maxHeight: 200,
    });
    const tableContainer = container.querySelector('.table-container') as HTMLElement;
    expect(tableContainer.className).toContain('custom');
    expect(tableContainer.style.maxWidth).toBe('300px');
    expect(tableContainer.style.maxHeight).toBe('200px');
  });
});
