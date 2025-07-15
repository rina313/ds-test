import { type ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import { Counter as CounterComponent } from './index';
import { CounterMetaData } from './Pagination.meta';
import type { CounterProps } from './Pagination.types';

const meta: Meta<typeof CounterComponent> = {
  title: 'Components/Pagination/Counter',
  component: CounterComponent,
  parameters: {
    docs: {
      description: {
        component: '페이지 번호를 숫자 형태로 표시하는 페이지네이션 방식입니다.',
      },
    },
  },
  ...CounterMetaData,
};
export default meta;

export const AllVariants = (params: CounterProps): ReactElement => {
  return (
    <div className='flex-row'>
      <CounterComponent {...params} size='s' />
      <CounterComponent {...params} size='m' />
    </div>
  );
};
