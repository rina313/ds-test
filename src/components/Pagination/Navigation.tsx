import React, { type ReactElement } from 'react';

import { clsx } from 'clsx';

import { TextButton } from '@/components/Button';
import { Icon } from '@/components/Icon';

import style from './Navigation.module.scss';
import type { NavigationProps } from './Pagination.types';

/** Selection > Pagination > Navigation 컴포넌트
 * @description 페이지의 위치를 숫자로 표시하고 이동할 수 있는 내비게이션 방식으로 사용됩니다.
 */
const Navigation = ({
  currentPage,
  totalPage,
  perPage = 10,
  onClick,
}: NavigationProps): ReactElement => {
  // 현재 페이지 그룹의 시작 번호
  const startPage = Math.floor((currentPage - 1) / perPage) * perPage + 1;
  // 그룹의 끝 번호 (전체 페이지를 넘지 않도록)
  const endPage = Math.min(startPage + perPage - 1, totalPage);
  // 표시할 페이지 번호 배열
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 이전 그룹으로 이동할 타겟 페이지
  const prevPage = Math.max(currentPage - perPage, 1);
  // 다음 그룹으로 이동할 타겟 페이지
  const nextPage = Math.min(currentPage + perPage, totalPage);

  return (
    <div className={style['navigation-container']}>
      <TextButton
        onClick={() => onClick(prevPage)}
        className={clsx(startPage === 1 && style.disabled, style['page-button'])}
      >
        <Icon iconName='chevron-left' />
      </TextButton>
      {pageNumbers.map((page) => (
        <TextButton
          key={page}
          value={page}
          onClick={() => onClick(page)}
          className={clsx(page === currentPage && style.current, style['page-button'])}
        >
          {page}
        </TextButton>
      ))}
      <TextButton
        onClick={() => onClick(nextPage)}
        className={clsx(endPage >= totalPage && style.disabled, style['page-button'])}
      >
        <Icon iconName='chevron-right' />
      </TextButton>
    </div>
  );
};
export default Navigation;
