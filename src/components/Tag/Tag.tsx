import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Tag.module.scss';
import type { TagProps } from './Tag.types';

const Tag = ({ variants = 'solid', size = 'm', iconName, label }: TagProps): ReactElement => {
  return (
    <div
      className={clsx(style.tag, style[variants], style[size], label && style['padding-vertical'])}
    >
      {iconName && (
        <span className={style['icon-wrapper']}>
          <i className={clsx('fa', `fa-${iconName}`)} />
        </span>
      )}
      {label && <span>{label}</span>}
    </div>
  );
};

export default Tag;
