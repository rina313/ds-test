import type { MouseEvent, ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Chip.module.scss';
import type { ChipProps } from './Chip.types';
import { Icon } from '../Icon';

const Chip = ({
  label,
  onClick,
  variants = 'primary',
  size = 'm',
  active = false,
  disabled = false,
  leadingIcon,
  leadingClick,
  trailingIcon,
  trailingClick,
}: ChipProps): ReactElement => {
  const handleIconClick =
    (iconType?: 'leading' | 'trailing') => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      if (iconType === 'leading') leadingClick?.();
      if (iconType === 'trailing') trailingClick?.();
    };

  const iconSize = size === 'xs' ? 's' : size;
  return (
    <div
      className={clsx(
        style.chip,
        style[variants],
        style[size],
        active && !disabled && style.active,
        disabled ? style.disabled : style.state,
        leadingIcon && style['leading-icon'],
        trailingIcon && style['trailing-icon'],
      )}
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-disabled={disabled}
    >
      {leadingIcon &&
        (leadingClick ? (
          <button type='button' onClick={handleIconClick('leading')}>
            <Icon {...leadingIcon} size={iconSize} />
          </button>
        ) : (
          <Icon {...leadingIcon} size={iconSize} />
        ))}
      <span>{label}</span>
      {trailingIcon &&
        (trailingClick ? (
          <button type='button' onClick={handleIconClick('trailing')}>
            <Icon {...trailingIcon} size={iconSize} />
          </button>
        ) : (
          <Icon {...trailingIcon} size={iconSize} />
        ))}
    </div>
  );
};

export default Chip;
