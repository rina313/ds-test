import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import { Icon } from '@/components/Icon';

import style from './Checkbox.module.scss';
import type { CheckboxProps } from './Selection.types';

/** Selection > Selection Controls > Checkbox 컴포넌트
 * @description Checkbox는 한 개 또는 다수의 독립적인 옵션들이 있어서 사용자의 의사에 따라 선택하지 않을 수 있고,
 * 하나 또는 여러 개를 선택할 수 있을 때 사용됩니다.
 * Checkbox가 한 개인 경우 기능을 on/off 하는 용도로 사용할 수 있습니다.
 */
const Checkbox = ({ checked, onClick, label, disabled }: CheckboxProps): ReactElement => {
  return (
    <div
      className={clsx(style['checkbox-container'], disabled && style.disabled)}
      onClick={() => !disabled && onClick && onClick()}
    >
      <div className={clsx(style['checkbox-wrapper'], checked && style.checked)}>
        {!disabled && <div className={style['checkbox-state']} />}
        <div className={style['checkbox-icon-wrapper']}>
          <Icon iconName='check' />
        </div>
      </div>
      {label}
    </div>
  );
};
export default Checkbox;
