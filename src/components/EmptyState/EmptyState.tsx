import { type ReactElement } from 'react';

import style from './EmptyState.module.scss';
import type { EmptyStateProps } from './EmptyState.types';
import { OutlineButton } from '../Button';
/**
 * Contents > EmptyState 컴포넌트
 * @description 페이지 내부에 표시할 수 있는 내용이 없는 경우 사용자의 혼란을 방지하고 행동을 유도하기 위해 사용합니다.
 * Empty state는 Container 내부에서 센터 정렬합니다.
 */
export default function EmptyState({
  children,
  title,
  subTitle,
  button,
}: EmptyStateProps): ReactElement {
  return (
    <div className={style['empty-state-container']}>
      {children}
      <div className={style['empty-state-text-wrapper']}>
        {title && <h2 className={style['empty-state-title']}>{title}</h2>}
        {subTitle && <p className={style['empty-state-subtitle']}>{subTitle}</p>}
      </div>
      {button && (
        <div className={style['empty-state-button']}>
          <OutlineButton {...button} />
        </div>
      )}
    </div>
  );
}
