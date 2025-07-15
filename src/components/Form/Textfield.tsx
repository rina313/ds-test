import type { ChangeEvent, KeyboardEvent, ReactElement } from 'react';

import { clsx } from 'clsx';

import { OutlineButton } from '@/components/Button';
import { warn } from '@/utils/logger';
import { TEXTFIELD_INVALID_CONTROL_PROPS } from '@/utils/logger/message';

import type { TextfieldProps } from './Form.types';
import FormHelper from './Helper';
import FormLabel from './Label';
import style from './Textfield.module.scss';
import { Icon } from '../Icon';

/** Form > Textfield 컴포넌트
 * @description 비교적 짧은 텍스트를 입력할 때 사용합니다.
 */
export default function Textfield({
  value,
  onChange,
  onEnter,
  disabled = false,
  negative = false,
  labelText,
  isTooltip,
  trailingBtnText,
  trailingBtnHandler,
  leadingIcon,
  trailingContent1,
  trailingContent2,
  helperText,
  maxCount,
  size = 'l',
  tooltipProps,
  ...props
}: TextfieldProps): ReactElement {
  if (trailingBtnText && (!trailingBtnHandler || typeof trailingBtnHandler !== 'function')) {
    warn(TEXTFIELD_INVALID_CONTROL_PROPS, { trailingBtnHandler, trailingBtnText });
  }
  const showLabel = labelText || isTooltip;
  const showHelper = helperText || !!maxCount;

  /** 내부 `input` 핸들러 입니다. */
  const handleOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const input = target.value.slice(0, maxCount ?? target.value.length);
    if (onChange) {
      onChange(input);
    }
  };
  /** 내부 `input` enter 입력 시 실행되는 핸들러 입니다. */
  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const input = target.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.(input);
    }
  };
  return (
    <div className={style['text-field-container']}>
      {showLabel && (
        <FormLabel labelText={labelText} isTooltip={isTooltip} tooltipProps={tooltipProps} />
      )}
      <div
        className={clsx(
          style['text-field-input'],
          trailingBtnText && style.isTrailingBtn,
          size && style[`size-${size}`],
        )}
      >
        <div
          className={clsx(
            style['text-field-wrapper'],
            disabled ? style.disabled : style.state,
            negative && style.negative,
          )}
        >
          {leadingIcon && <Icon className={style['label-icon']} {...leadingIcon} />}
          <input
            {...props}
            value={value}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            maxLength={maxCount}
          />
          {!disabled && (
            <>
              {trailingContent1 && <div className={style['label-content']}>{trailingContent1}</div>}
              {trailingContent2 && <div className={style['label-content']}>{trailingContent2}</div>}
            </>
          )}
        </div>
        {trailingBtnText && (
          <OutlineButton onClick={trailingBtnHandler}>{trailingBtnText}</OutlineButton>
        )}
      </div>
      {showHelper && (
        <FormHelper
          helperText={helperText}
          maxCount={maxCount}
          length={String(value)?.length}
          negative={negative}
        />
      )}
    </div>
  );
}
