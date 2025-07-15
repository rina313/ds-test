import type { ChangeEvent, ReactElement } from 'react';

import { clsx } from 'clsx';

import type { TextareaProps } from './Form.types';
import FormHelper from './Helper';
import FormLabel from './Label';
import style from './Textarea.module.scss';

/** Form > Textarea 컴포넌트
 * @description 긴 텍스트를 입력할 사용합니다.
 */
export default function Textarea({
  value,
  onChange,
  labelText,
  isTooltip,
  helperText,
  maxCount,
  disabled = false,
  negative = false,
  tooltipProps,
  ...props
}: TextareaProps): ReactElement {
  const showLabel = labelText || isTooltip;
  const showHelper = helperText || !!maxCount;

  /** 내부 `input` 핸들러 입니다. */
  const handleOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const input = target.value.slice(0, maxCount as number);
    if (onChange) {
      onChange(input);
    }
  };

  return (
    <div className={style['textarea-container']}>
      {showLabel && (
        <FormLabel labelText={labelText} isTooltip={isTooltip} tooltipProps={tooltipProps} />
      )}
      <div
        className={clsx(
          style['textarea-wrapper'],
          disabled ? style.disabled : style.state,
          negative && style.negative,
        )}
      >
        <textarea
          name={props.name ?? 'textarea'}
          value={value}
          disabled={disabled}
          onChange={handleOnChange}
          maxLength={maxCount}
          {...props}
        />
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
