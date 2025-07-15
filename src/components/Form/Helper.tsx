import type { ReactElement } from 'react';

import { clsx } from 'clsx';

import type { FormHelperProps } from './Form.types';
import style from './style.module.scss';

interface FormHelperWithLength extends FormHelperProps {
  length?: number;
  negative?: boolean;
}
/** Selection > Menu > Label 컴포넌트 */
const FormHelper = ({
  helperText,
  maxCount,
  length,
  negative,
}: FormHelperWithLength): ReactElement => {
  return (
    <div className={clsx(style['helper-wrapper'], negative && style.negative)}>
      <p className={style.text}>{helperText}</p>
      {!!maxCount && (
        <p className={style.maxCount}>
          {length}/{maxCount}
        </p>
      )}
    </div>
  );
};
export default FormHelper;
