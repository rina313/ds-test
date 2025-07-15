import { useEffect, useState, type ReactElement } from 'react';

import type { IconName } from '@fortawesome/fontawesome-svg-core';
import { clsx } from 'clsx';

import style from './SnackBar.module.scss';
import type { SnackBarProps } from './SnackBar.types';
import { TextButton } from '../Button';
import { Icon } from '../Icon';

const SnackBar = ({
  variants = 'normal',
  label,
  icon,
  trailingButtonLabel,
  trailingButtonClick,
  onClose,
  exiting = false,
}: SnackBarProps): ReactElement => {
  const [iconName, setIconName] = useState<IconName | undefined>(undefined);

  useEffect(() => {
    switch (variants) {
      case 'success':
        setIconName('circle-check');
        break;
      case 'cautionary':
        setIconName('triangle-exclamation');
        break;
      case 'negative':
        setIconName('circle-exclamation');
        break;
      default:
        setIconName(undefined);
    }
  }, [variants]);

  return (
    <div className={clsx(style.wrapper, exiting && style['snackbar-exit'])}>
      {iconName && (
        <div className={style[variants]}>
          <Icon iconName={iconName} alt={variants} />
        </div>
      )}
      {!iconName && icon && (
        <div>
          <Icon {...icon} />
        </div>
      )}
      <p className={style.label}>{label}</p>
      {trailingButtonLabel && (
        <TextButton variants='secondary' onClick={() => trailingButtonClick?.()}>
          {trailingButtonLabel}
        </TextButton>
      )}
      {onClose && (
        <button role='button' className={style['close-button']} onClick={onClose}>
          <Icon iconName='close' alt='닫기' />
        </button>
      )}
    </div>
  );
};

export default SnackBar;
