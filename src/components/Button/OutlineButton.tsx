import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Button.module.scss';
import type { OutlineButtonProps } from './Button.types';
import { Icon } from '../Icon';

export default function OutlineButton({
  variants = 'primary',
  size = 'm',
  disabled = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  children,
  className,
  ...props
}: OutlineButtonProps): ReactElement {
  return (
    <button
      className={clsx(
        style.button,
        style['outline-button'],
        style[variants],
        style[size],
        disabled ? style.disabled : style.state,
        iconOnly && style['icon-only'],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {leadingIcon && <Icon {...leadingIcon} size={size} />}
      {!iconOnly && <span className={style.label}>{children}</span>}
      {trailingIcon && <Icon {...trailingIcon} size={size} />}
    </button>
  );
}
