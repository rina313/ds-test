import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Radio.module.scss';
import type { RadioProps } from './Selection.types';

/** Selection > Selection Controls > Radio 컴포넌트
 * @description Radio button은 상호 간에 배타적인 두 개 이상의 옵션이 있어서 그중 하나만을 선택할 수 있을 경우 사용됩니다.
 * ※디폴트로 하나는 무조건 선택되어 있어야 합니다.
 */
const Radio = ({ checked, onClick, label, disabled }: RadioProps): ReactElement => {
  return (
    <div
      className={clsx(style['radio-container'], disabled && style.disabled)}
      onClick={() => !disabled && onClick && onClick()}
    >
      <div className={clsx(style['radio-wrapper'], checked && style.checked)}>
        {!disabled && <div className={style['radio-state']} />}
        <div className={style['radio-icon-wrapper']}>
          <div />
        </div>
      </div>
      {label}
    </div>
  );
};
export default Radio;
