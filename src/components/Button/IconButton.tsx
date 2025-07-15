import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import { extractTextFromReactNode } from '@/utils';

import style from './Button.module.scss';
import type { IconButtonProps } from './Button.types';
import { Icon } from '../Icon';

export default function IconButton({
  variants = 'primary',
  size = 'm',
  disabled = false,
  badge = false,
  icon,
  className,
  children,
  ...props
}: IconButtonProps): ReactElement {
  const childrenText = extractTextFromReactNode(children);
  return (
    <button
      className={clsx(
        style.button,
        style['icon-button'],
        style[variants],
        style[size],
        disabled ? style.disabled : style.state,
        className,
        {
          [style.badge]: !disabled && badge,
        },
      )}
      disabled={disabled}
      {...props}
    >
      <Icon {...icon} size={size} alt={icon?.alt || childrenText} />
    </button>
  );
}
