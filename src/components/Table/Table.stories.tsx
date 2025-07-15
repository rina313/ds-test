import { type ReactElement, useEffect, useMemo, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';

import { Table } from './index';
import type { User } from './Table.meta';
import { makeData, tableMetaData } from './Table.meta';
import type { TableProps, TableSize } from './Table.types';
import { Checkbox } from '../SelectionControls';
import { Tooltip } from '../Tooltip';

const meta: Meta<typeof Table> = {
  title: 'Components/Contents/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          '데이터를 행과 열로 구성하여 정보를 정리합니다. 필요한 경우 Detach해서 쓸 수 있으며, 실제 구현은 라이브러리를 사용합니다. ',
      },
    },
  },
  ...tableMetaData,
};
export default meta;

const verticalVariants: TableSize[] = ['s', 'm'];

export const AllVariants = (args: TableProps<User>): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedId, setCheckedId] = useState<string[]>([]);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    setData(makeData(12));
  }, []);
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'checkbox',
        header: () => (
          <Checkbox
            checked={checkedId.length === data.length}
            onClick={() =>
              setCheckedId((prev) =>
                prev.length === data.length ? [] : data.map((item) => item.id),
              )
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={checkedId.includes(row.original.id)}
            onClick={() =>
              setCheckedId((prev) =>
                prev.includes(row.original.id)
                  ? prev.filter((i) => i !== row.original.id)
                  : [...prev, row.original.id],
              )
            }
          />
        ),
        size: 40,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: '이름',
      },
      {
        accessorKey: 'state',
        header: () => (
          <Tooltip label='상태' placement='down-center'>
            상태
          </Tooltip>
        ),
        cell: ({ row }) => row.original.state,
        size: 100,
      },
      {
        accessorKey: 'email',
        header: '이메일',
        size: 200,
      },
      {
        accessorKey: 'adress',
        header: '주소',
        cell: ({ row }) => row.original.adress,
        size: 600,
      },
    ],
    [checkedId],
  );

  return (
    <div className='flex-column' style={{ gap: 20, padding: 20, alignItems: 'flex-start' }}>
      {verticalVariants.map((size, index) => (
        <div style={{ width: '100%' }} key={`textField-size-${size}-${index}`}>
          <h4>Size: {size}</h4>
          <Table size={size} columns={columns} data={data} />
        </div>
      ))}
      <h4>With Pagination</h4>
      <Table
        columns={columns}
        data={data}
        isPagination
        paginationProps={{
          totalPage: Math.ceil(data.length / 5),
          currentPage: currentPage,
          perPage: 5,
          onClick: (page) => setCurrentPage(page),
        }}
      />
      <h4>td Fixed</h4>
      <Table
        maxWidth={600}
        columns={columns}
        data={data}
        fixCell='name'
        isPagination
        paginationProps={{
          totalPage: Math.ceil(data.length / 5),
          currentPage: currentPage,
          perPage: 5,
          onClick: (page) => setCurrentPage(page),
        }}
      />
      <h4>Scroll</h4>
      <Table maxHeight={400} columns={columns} data={data} />
      <h4>Empty State</h4>
      <Table
        maxWidth={args.maxWidth ? `${args.maxWidth}px` : undefined}
        maxHeight={args.maxHeight ? `${args.maxHeight}px` : undefined}
        columns={columns}
        data={[]}
        title={args.title}
        subTitle={args.subTitle}
      />
    </div>
  );
};
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    data: [
      {
        accessorKey: 'id',
        id: '1',
        name: '홍길동',
        email: 'hong@example.com',
        productName: '[1+1] 갸스비 무빙락 헤어스프레이 엑스트라 하드 볼륨 머리고정스프레이 253ml',
      },
      {
        accessorKey: 'id',
        id: '2',
        name: '김철수',
        email: 'kim@example.com',
        productName: '[1+1] 갸스비 무빙락 헤어스프레이 엑스트라 하드 볼륨 머리고정스프레이 253ml',
      },
      {
        accessorKey: 'id',
        id: '3',
        name: '이영희',
        email: 'lee@example.com',
        productName: '[1+1] 갸스비 무빙락 헤어스프레이 엑스트라 하드 볼륨 머리고정스프레이 253ml',
      },
    ],
    columns: [
      { accessorKey: 'id', header: 'ID', size: 50 },
      { accessorKey: 'name', header: '이름', size: 100 },
      { accessorKey: 'email', header: '이메일' },
      { accessorKey: 'productName', header: '상품명', size: 600 },
    ],
    size: 'm',
    fixCell: '',
    isPagination: false,
    paginationProps: {
      totalPage: 3,
      currentPage: 1,
      perPage: 5,
      onClick: () => {},
    },
    maxWidth: undefined,
    maxHeight: undefined,
    title: '데이터가 없습니다.',
    subTitle: '데이터를 추가해주세요.',
    button: undefined,
  },
  render: (args) => (
    <Table
      {...args}
      maxWidth={args.maxWidth ? `${args.maxWidth}px` : undefined}
      maxHeight={args.maxHeight ? `${args.maxHeight}px` : undefined}
    />
  ),
};
