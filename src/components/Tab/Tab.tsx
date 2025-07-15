import { type ReactElement } from 'react';

import { clsx } from 'clsx';

import style from './Tab.module.scss';
import type { TabProps } from './Tab.types';

/** Selection > Tab > Tab 컴포넌트
 * @description 탭(Tabs)은 페이지 내 유사한 콘텐츠를 그룹화하여 섹션 간 이동 시 사용합니다. 해당 페이지를 벗어나지 않고 섹션 별 콘텐츠 둘러보기 가능합니다.
 */
export default function Tab({
  options,
  selectedIdx,
  onClick,
  size = 's',
  vertical = false,
  horizontal = false,
}: TabProps): ReactElement {
  return (
    <div
      className={clsx(
        style['tab-container'],
        size && style[`size-${size}`],
        horizontal && style.horizontal,
      )}
    >
      <ul className={clsx(style['tab-wrapper'], vertical && style.vertical)}>
        {options.map((option, index) => (
          <li
            key={index}
            className={clsx(style['tab-content'], selectedIdx === index && style.selected)}
            onClick={() => onClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
