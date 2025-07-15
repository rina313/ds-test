import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import type { SwitchProps } from './Selection.types';
import style from './Switch.module.scss';

/** Selection > Selection Controls > Switch 컴포넌트
 * @description Toggle-switch는 상호간에 배타적인 옵션이 있어 각 선택에 따른 효과 전환이 필요할 경우 사용합니다.
 */
const Switch = ({
  on,
  onClick,
  size = 'm',
  disabled = false,
  label,
}: SwitchProps): ReactElement => {
  return (
    <div className={style['switch-container']}>
      {label && (
        <div className={style['switch-label']} onClick={() => !disabled && onClick?.()}>
          {label}
        </div>
      )}
      <div
        className={clsx(
          style['switch-wrapper'],
          on && style.on,
          disabled && style.disabled,
          size && style[`size-${size}`],
        )}
        onClick={() => !disabled && onClick?.()}
      >
        {!disabled && <div className={style['switch-state']} />}
        <div className={style['switch-handle']} />
      </div>
    </div>
  );
};
export default Switch;
