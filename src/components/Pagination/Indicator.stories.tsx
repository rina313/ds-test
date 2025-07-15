import { useState, type ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import { Indicator as IndicatorComponent } from './index';
import { IndicatorMetaData } from './Pagination.meta';
import type { IndicatorProps } from './Pagination.types';

const meta: Meta<typeof IndicatorComponent> = {
  title: 'Components/Pagination/Indicator',
  component: IndicatorComponent,
  parameters: {
    docs: {
      description: {
        component: '페이지 번호를 숫자 형태로 표시하는 페이지네이션 방식입니다.',
      },
    },
  },
  ...IndicatorMetaData,
};
export default meta;

export const Indicator = (params: IndicatorProps): ReactElement => {
  const { totalCount, selectedIdx } = params;
  const [index, setIndex] = useState<number>(0);
  return (
    <IndicatorComponent
      selectedIdx={index || selectedIdx}
      totalCount={totalCount}
      onClick={(idx) => setIndex(idx)}
    />
  );
};
