import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './SegmentedControl.module.scss';
import type { SegmentedControlProps } from './Tab.types';

/** Selection > Tab > Segmented Control 컴포넌트
 * @description 여러 옵션 중 하나를 선택할 수 있으며, 선택된 항목을 화면에 표시합니다.
 */
export default function SegmentedControl({
  options,
  selectedIdx,
  onClick,
  size = 's',
  maxWidth,
}: SegmentedControlProps): ReactElement {
  return (
    <div
      className={clsx(
        style['segmented-container'],
        size && style[`size-${size}`],
        maxWidth && style['max-width'],
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {options.map((option, index) => (
        <button
          key={index}
          className={clsx(style['segmented-content'], selectedIdx === index && style.selected)}
          onClick={() => onClick(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
