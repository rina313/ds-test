import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Counter.module.scss';
import type { CounterProps } from './Pagination.types';

/** Selection > Pagination > Counter 컴포넌트
 * @description 페이지 번호를 숫자 형태로 표시하는 페이지네이션 방식입니다.
 */
const Counter = ({ totalPage, currentPage, size = 'm' }: CounterProps): ReactElement => {
  return (
    <div className={clsx(style['counter-container'], style[`size-${size}`])}>
      <p>{currentPage}</p>
      <p>/</p>
      <p>{totalPage}</p>
    </div>
  );
};

export default Counter;
