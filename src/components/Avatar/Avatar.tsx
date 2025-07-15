import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import type { AvatarProps, AvatarSize } from './Avatar.types';
import { Icon } from '../Icon';
import style from './Avatar.module.scss';
/**
 * Contents > Avatar 컴포넌트
 * @description 아바타는 인터페이스에서 개인이나 기업의 썸네일을 보여주는 데 사용됩니다.
 */
export default function Avatar({
  variant = 'circle',
  size = 'm',
  imageUrl = '',
}: AvatarProps): ReactElement {
  const sizeMap: Record<AvatarSize, 'xs' | 'm' | 'l'> = {
    xs: 'xs',
    s: 'm',
    m: 'l',
  };
  return (
    <div
      data-testid='avatar'
      className={clsx(style[`avatar-container`], style[`${variant}`], style[`size-${size}`])}
    >
      {imageUrl ? (
        <img src={imageUrl} alt='Avatar' className={`avatar ${variant} ${size}`} />
      ) : (
        <div data-testid='icon' className={style[`icon-wrapper`]}>
          {/* 아이콘은 기본적으로 'user' 아이콘을 사용합니다. 필요에 따라 다른 아이콘으로 변경할 수 있습니다. */}
          {/* aria-label은 접근성을 위해 추가합니다. */}
          <Icon iconName={'user'} alt='User Icon' size={sizeMap[size]} />
        </div>
      )}
    </div>
  );
}
