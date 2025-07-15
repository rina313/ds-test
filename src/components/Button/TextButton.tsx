import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Button.module.scss';
import type { TextBlockButtonProps, TextButtonProps, TextLinkButtonProps } from './Button.types';
import { Icon } from '../Icon';

export default function TextButton({
  variants = 'primary',
  disabled = false,
  active = false,
  size = 'm',
  leadingIcon,
  trailingIcon,
  children,
  className,
  ...props
}: TextButtonProps): ReactElement {
  const iconSize = size === 'l' ? 'm' : 's';
  if ('href' in props) {
    const { href, ...rest } = props as TextLinkButtonProps;
    return (
      <a
        href={disabled ? undefined : href}
        className={clsx(
          style.button,
          style['text-button'],
          style[variants],
          style[size],
          active && style.active,
          disabled ? style.disabled : style.state,
          className,
        )}
        {...rest}
      >
        {leadingIcon && <Icon {...leadingIcon} size={iconSize} />}
        {children}
        {trailingIcon && <Icon {...trailingIcon} size={iconSize} />}
      </a>
    );
  }
  const { ...rest } = props as TextBlockButtonProps;
  return (
    <button
      className={clsx(
        style.button,
        style['text-button'],
        style[variants],
        style[size],
        disabled ? style.disabled : style.state,
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {leadingIcon && <Icon {...leadingIcon} size={iconSize} />}
      {children}
      {trailingIcon && <Icon {...trailingIcon} size={iconSize} />}
    </button>
  );
}
