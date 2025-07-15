import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import { warn } from '@/utils/logger';
import { ICON_INVALID_PROPS } from '@/utils/logger/message';

import style from './Icon.module.scss';
import type { IconProps } from './Icon.types';

export const Icon = ({
  variants = 'fa-solid',
  size = 'm',
  iconName,
  src,
  alt = '',
  className,
}: IconProps): ReactElement => {
  const isImage = variants === 'image' && !!src;
  const isFontIcon = variants !== 'image' && !!iconName;

  if (!isImage && !isFontIcon) {
    warn(ICON_INVALID_PROPS, { variants, iconName, src });
    return (
      <span className={clsx(style.wrapper, style[size], className)}>
        {process.env.NODE_ENV !== 'production' ? '⚠️ Invalid Icon' : null}
      </span>
    );
  }

  if (isImage) {
    return (
      <span className={clsx(style.wrapper, style[size], className)}>
        <img src={src} alt={alt} className={style.image} />
      </span>
    );
  }
  return (
    <span className={clsx(style.wrapper, style[size], className)} role='img' aria-label={alt}>
      {iconName && (
        <i className={clsx(style.icon, variants, `fa-${iconName}`)} aria-hidden='true' />
      )}
    </span>
  );
};

export default Icon;
