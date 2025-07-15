import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './SectionMessage.module.scss';
import type { SectionMessageProps } from './SectionMessage.types';
import { Icon } from '../Icon';

const SectionMessage = ({
  variants = 'horizontal',
  icon,
  trailingChildren,
  title,
  description,
}: SectionMessageProps): ReactElement => {
  return (
    <div className={clsx(style.wrapper)}>
      {icon && <Icon {...icon} />}
      <div className={clsx(style.content, style[variants])}>
        <div>
          <p className={style.title}>{title}</p>
          <p className={style.description}>{description}</p>
        </div>
        {trailingChildren && <div className={style.trailing}>{trailingChildren}</div>}
      </div>
    </div>
  );
};

export default SectionMessage;
