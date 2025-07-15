import { useState, useRef, type ReactElement, useCallback, useEffect } from 'react';

import { clsx } from 'clsx';

import style from './Slider.module.scss';
import type { SliderProps } from './Slider.types';

/**
 * Slider 컴포넌트
 * @description 범위 내의 현재 값과 간격을 표시하기 위한 구성 요소입니다.
 */
export default function Slider({
  min = 0,
  max,
  minValue: initMinValue = min,
  maxValue: initMaxValue = max,
  isSingle = false,
  onChangeRange,
  labelText = 'label',
  showValue = true,
  unitText = '',
  disabled = false,
}: SliderProps): ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(initMinValue);
  const [maxValue, setMaxValue] = useState(initMaxValue);
  const [hovered, setHovered] = useState<'min' | 'max' | null>(null);
  const draggingRef = useRef<'min' | 'max' | null>(null);
  const percent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const type = draggingRef.current;
      if (!type || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const newValue = Math.round(min + (x / rect.width) * (max - min));

      if (type === 'min') {
        const newMin = Math.min(newValue, maxValue - 1);
        setMinValue(newMin);
        onChangeRange?.([newMin, maxValue]);
      } else {
        const newMax = Math.max(newValue, isSingle ? min : minValue + 1);
        setMaxValue(newMax);
        onChangeRange?.(isSingle ? newMax : [minValue, newMax]);
      }
    },
    [maxValue, minValue],
  );

  const startDrag = (type: 'min' | 'max') => {
    if (disabled) return;
    draggingRef.current = type;
    setHovered(type);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  const handleEnd = useCallback(() => {
    draggingRef.current = null;
    setHovered(null);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  }, [handleMove]);

  /** 최소 / 최대값에 단위를 추가합니다 */
  const valueWithUnit = (num: number): string => {
    return `${num.toLocaleString('ko-KR')}${unitText}`;
  };

  useEffect(() => {
    setMinValue(initMinValue);
    setMaxValue(initMaxValue);
  }, [initMinValue, initMaxValue, min, max]);

  // min/max 보정
  const displayMin = Math.max(minValue, min);
  const displayMax = Math.min(maxValue, max);

  return (
    <div className={clsx(style['slider-container'], disabled ? style.disabled : style.state)}>
      <div className={style['slider-header']}>
        <span>{labelText}</span>
        {showValue && (
          <span className={style['slider-value']}>
            {isSingle
              ? valueWithUnit(displayMax)
              : `${valueWithUnit(displayMin)} ~ ${valueWithUnit(displayMax)}`}
          </span>
        )}
      </div>
      <div className={style['slider-track']} ref={trackRef}>
        <div
          className={style['slider-range']}
          style={{
            left: `${percent(isSingle ? min : displayMin)}%`,
            width: `${percent(displayMax) - percent(isSingle ? min : displayMin)}%`,
          }}
        />
        {!isSingle && (
          <div
            className={style['thumb']}
            style={{ left: `${displayMin === 0 ? '8px' : `${percent(displayMin)}%`}` }}
            onMouseDown={() => startDrag('min')}
            onTouchStart={() => startDrag('min')}
          >
            {!disabled && hovered === 'min' && (
              <div className={style['tooltip']}>{valueWithUnit(displayMin)}</div>
            )}
          </div>
        )}
        <div
          className={style['thumb']}
          style={{ left: `${displayMax === max ? 'calc(100% - 8px)' : `${percent(displayMax)}%`}` }}
          onMouseDown={() => startDrag('max')}
          onTouchStart={() => startDrag('max')}
        >
          {!disabled && hovered === 'max' && (
            <div className={style['tooltip']}>{valueWithUnit(displayMax)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
