import type { ReactNode } from 'react';

import type { Meta } from '@storybook/react/*';

import { Chip } from '../Chip';
import { Tag } from '../Tag';
import { Tooltip } from '../Tooltip';
export type User = {
  id: string;
  name: string;
  state: ReactNode;
  email: string;
  adress: ReactNode;
};
export function makeData(len: number): User[] {
  const data: User[] = [];
  for (let i = 0; i < len; i++) {
    data.push({
      id: Math.random().toString(36).substring(2, 10),
      name: ['홍길동', '김철수', '이영희', '박지민', '최준호'][Math.floor(Math.random() * 5)],
      email: `${Math.random().toString(36).substring(2, 8)}@example.com`,
      state: (
        <Tooltip label='종료로 변경' placement='down-center'>
          {
            [
              <Tag key={'종료'} variants='solid' label={'종료'} />,
              <Chip key={'진행'} variants='secondary' size='xs' label={'진행'} />,
            ][Math.floor(Math.random() * 2)]
          }
        </Tooltip>
      ),
      adress: (
        <p style={{ textAlign: 'center' }}>
          {Math.floor(Math.random() * 100)}번지 무슨ㅅ무슨빌딩 2323232, 서울시{' '}
          {['강남구', '서초구', '송파구', '강동구', '관악구'][Math.floor(Math.random() * 5)]}
        </p>
      ),
    });
  }
  return data;
}
export const tableMetaData: Meta = {
  argTypes: {
    data: {
      control: false,
    },
    columns: {
      control: false,
    },
    onRowClick: {
      control: false,
    },
    className: {
      control: false,
    },
    fixCell: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm'],
      table: {
        type: { summary: 's | m' },
      },
    },
    isPagination: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    paginationProps: {
      control: false,
      table: {
        type: { summary: 'NavigationProps' },
        category: 'Pagination',
      },
    },
    maxWidth: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    maxHeight: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      name: 'emptyState.title',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Empty State',
      },
    },
    subTitle: {
      name: 'emptyState.subTitle',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Empty State',
      },
    },
    button: {
      name: 'emptyState.button',
      control: false,
      table: {
        type: { summary: 'string' },
        category: 'Empty State',
      },
    },
  },
  args: {
    data: [],
    columns: [],
    size: 'm',
    fixCell: '',
    isPagination: false,
    paginationProps: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    title: 'No Data',
    subTitle: '표시할 데이터가 없습니다.',
    button: undefined,
  },
};
