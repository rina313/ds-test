import type { ReactElement } from 'react';

import { Icon } from '@/components/Icon';

import type { FormLabelProps } from './Form.types';
import style from './style.module.scss';
import { IconButton } from '../Button';
import { Tooltip } from '../Tooltip';

/** Selection > Menu > Label 컴포넌트 */
const FormLabel = ({
  labelText,
  isTooltip = false,
  tooltipProps,
}: FormLabelProps): ReactElement => {
  const { label, trailingButton } = tooltipProps || {};
  return (
    <div className={style['label-wrapper']}>
      <p>{labelText}</p>
      {isTooltip && (
        <Tooltip
          {...tooltipProps}
          label={label || labelText}
          trailingButton={
            trailingButton ? (
              <IconButton
                variants='secondary'
                style={{ color: '#ddd', padding: '0' }}
                icon={{
                  iconName: 'close',
                }}
              />
            ) : undefined
          }
        >
          <div data-testid='form-label-tooltip'>
            <Icon
              className={style['tooltip-wrapper']}
              iconName='circle-info'
              size='s'
              alt='tooltip information icon'
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
};
export default FormLabel;
