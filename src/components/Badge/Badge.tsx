import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import { IconButton } from '@/components/Button';

import style from './Badge.module.scss';
import type { BadgeProps } from './Badge.types';

const Badge = ({
  variants = 'number',
  size = 's',
  count = 0,
  show = true,
  border = true,
  children,
  className,
  ...props
}: BadgeProps): ReactElement => {
  const showCount = variants === 'number' && !!count;
  const isVisible = show && !!count;
  return (
    <div {...props} className={clsx(className, style.wrapper)}>
      {children ?? (
        <IconButton
          variants='secondary'
          size='xl'
          icon={{ iconName: 'bell' }}
          className={style.icon}
        >
          알림
        </IconButton>
      )}
      {isVisible && (
        <span className={clsx(style.badge, style[variants], style[size], border && style.border)}>
          {showCount && (count > 99 ? '99+' : count)}
        </span>
      )}
    </div>
  );
};

export default Badge;
