import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import { Icon } from '@/components/Icon';

import style from './Indicator.module.scss';
import type { IndicatorProps } from './Pagination.types';

/** Selection > Pagination > Indicator 컴포넌트
 * @description 페이지를 작은 점(dot) 형태로 표시하여 사용자가 현재 페이지와 다른 페이지로 쉽게 이동할 수 있도록 돕습니다.
 */
const Indicator = ({ totalCount, selectedIdx, onClick }: IndicatorProps): ReactElement => {
  const lists = Array.from({ length: totalCount }, (_, i) => i);
  return (
    <div className={clsx(style['indicator-container'])}>
      {lists.map((index) => (
        <button
          key={index}
          className={clsx(style['indicator-content'], selectedIdx === index && style.selected)}
          onClick={() => onClick(index)}
        >
          <div className={style.status} />
          <Icon className={style.icon} iconName='circle' />
        </button>
      ))}
    </div>
  );
};

export default Indicator;
