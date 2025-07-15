import { useEffect, useRef, useState, type ReactElement } from 'react';

import { clsx } from 'clsx';

import { IconButton } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { useSelectController } from '@/hooks/useSelectController';
import { warn } from '@/utils/logger';
import { CHIP_GROUP_INVALID_CONTROL_PROPS } from '@/utils/logger/message';

import style from './ChipGroup.module.scss';
import type { ChipGroupProps } from './ChipGroup.types';

const ChipGroup = ({
  chips = [],
  variants = 'primary',
  size = 'm',
  paddingVariants = false,
  paddingHorizontal = false,
  gradientLeading = false,
  gradientTrailing = false,
  gradientColor = '#fff',
  multiple = false,
  trailingButtonIcon,
  trailingButtonClick,
  selectedChipIds,
  onSelectionChange,
  selectable = true,
  renderChips,
}: ChipGroupProps): ReactElement => {
  if (onSelectionChange && selectedChipIds === undefined) {
    warn(CHIP_GROUP_INVALID_CONTROL_PROPS, {
      onSelectionChange: !!onSelectionChange,
      selectedChipIds,
    });
  }

  // trailing button을 사용하는 경우 레이아웃, 이벤트 범위, 그라데이션 여백을 달리 설정하기 위한 값
  const hasTrailingButton = !!trailingButtonIcon && !!trailingButtonClick;
  // hook을 이용한 selection 기능 구현
  const { isSelected, toggle } = useSelectController({
    selectedIds: selectedChipIds,
    onSelectionChange,
    multiSelect: multiple,
    selectable,
    initialItemIds: [],
  });
  // Chip onClick 커링함수
  const createChipClickHandler = (id: string, chipOnClick?: () => void) => () => {
    chipOnClick?.();
    toggle(id);
  };

  // gradient 표시 여부를 동적으로 관리
  const containerRef = useRef<HTMLUListElement>(null);
  const [showLeading, setShowLeading] = useState(false);
  const [showTrailing, setShowTrailing] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    const updateGradient = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeading(scrollLeft > 0);
      setShowTrailing(scrollLeft + clientWidth < scrollWidth - 1);
    };
    updateGradient(); // 초기 상태 업데이트
    container.addEventListener('scroll', updateGradient);
    window.addEventListener('resize', updateGradient);
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('scroll', updateGradient);
      window.removeEventListener('resize', updateGradient);
      container.removeEventListener('wheel', onWheel);
    };
  }, [chips]);

  return (
    <div
      className={clsx(
        style['chip-group'],
        style[variants],
        style[size],
        paddingVariants && style['padding-variants'],
        paddingHorizontal && style['padding-horizontal'],
        gradientLeading && showLeading && style['gradient-leading'],
        gradientTrailing && showTrailing && style['gradient-trailing'],
        hasTrailingButton && style['use-trailing-button'],
      )}
      style={
        {
          '--chip-gradient-color': gradientColor,
        } as React.CSSProperties
      }
    >
      <ul ref={containerRef}>
        {chips.map((chipProps) => {
          const active = isSelected(chipProps.id);
          return (
            <li key={chipProps.id}>
              <Chip
                {...(renderChips ? renderChips(active, chipProps) : chipProps)}
                active={active}
                variants={variants}
                size={chipProps.size || size}
                onClick={createChipClickHandler(chipProps.id, chipProps.onClick)}
              />
            </li>
          );
        })}
      </ul>
      {hasTrailingButton && (
        <IconButton
          className={style['trailing-button']}
          size={size}
          onClick={trailingButtonClick}
          variants='secondary'
          icon={trailingButtonIcon}
        />
      )}
    </div>
  );
};

export default ChipGroup;
