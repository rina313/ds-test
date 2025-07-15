import { useState, type ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import { Navigation as NavigationComponent } from './index';
import { NavigationMetaData } from './Pagination.meta';
import type { NavigationProps } from './Pagination.types';

const meta: Meta<typeof NavigationComponent> = {
  title: 'Components/Pagination/Navigation',
  component: NavigationComponent,
  parameters: {
    docs: {
      description: {
        component: '페이지의 위치를 숫자로 표시하고 이동할 수 있는 내비게이션 방식으로 사용됩니다.',
      },
    },
  },
  ...NavigationMetaData,
};
export default meta;

export const Navigation = (params: NavigationProps): ReactElement => {
  const { totalPage, currentPage, perPage } = params;
  const [index, setIndex] = useState<number>(0);
  return (
    <NavigationComponent
      currentPage={index || currentPage}
      totalPage={totalPage}
      perPage={perPage}
      onClick={(idx) => setIndex(idx)}
    />
  );
};
