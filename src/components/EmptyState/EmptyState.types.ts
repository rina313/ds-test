import type { HTMLAttributes } from 'react';

import type { OutlineButtonProps } from '@/components/Button/Button.types';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** 타이틀 영역 */
  title?: string;
  /** 서브 타이틀 영역 */
  subTitle?: string;
  /** 버튼 영역 */
  button?: OutlineButtonProps;
}
export type { EmptyStateProps };
