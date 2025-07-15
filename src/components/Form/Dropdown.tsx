import { useEffect, useMemo, useRef, useState, type ReactElement } from 'react';

import { clsx } from 'clsx';
import { createPortal } from 'react-dom';

import type { ChipProps } from '@/components/Chip/Chip.types';
import { ChipGroup } from '@/components/ChipGroup';
import { Menu } from '@/components/Menu';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRefPosition } from '@/hooks/useRefPosition';

import style from './Dropdown.module.scss';
import type { DropdownProps } from './Form.types';
import FormHelper from './Helper';
import FormLabel from './Label';
import { Icon } from '../Icon';
import type { MenuItemProps } from '../Menu/Menu.types';

/**
 * Form > Dropdown 컴포넌트
 * @description 드롭다운(Dropdowns)은 사용자가 옵션 리스트 중 하나의 옵션 선택 시 활용되는 컴포넌트입니다.
 * 선택 가능한 옵션 개수가 다수일 경우, 드롭다운 메뉴를 사용해 값을 노출합니다.
 */
const Dropdown = ({
  onSelectionChange,
  labelText,
  isTooltip,
  helperText,
  negative = false,
  disabled = false,
  chipProps,
  menus = [],
  placeholder,
  selectedIds: initSelectedIds = [],
  size = 'l',
  multiSelect = false,
  tooltipProps,
  ...menuProps
}: DropdownProps): ReactElement => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initSelectedIds);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false); // 드롭다운 포커스 상태 (ChipGroup에서 gradientColor 변경 위해 사용)

  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { style: menuStyle } = useRefPosition(isMenuOpen, wrapperRef);

  const selectedItems = useMemo((): { id: string; label: string }[] => {
    const result: { id: string; label: string }[] = [];
    // 재귀적으로 메뉴 아이템을 탐색하여 선택된 아이템을 찾는 함수
    const checkingItem = (items: MenuItemProps[]) => {
      for (const item of items) {
        if (selectedIds.includes(item.id)) {
          result.push({ id: item.id, label: item.label });
        }
        if (item.subMenu) {
          checkingItem(item.subMenu);
        }
      }
    };

    checkingItem(menus);
    return result;
  }, [selectedIds]);
  const isSelected = selectedItems.length > 0;

  const showLabel = !!labelText || isTooltip;
  const handleOutsideClickCallback = (e: MouseEvent) => {
    const menuEls = document.querySelectorAll('[data-type="dropdown-menu"]');
    if (!Array.from(menuEls).some((menuEl) => menuEl.contains(e.target as Node))) {
      setIsMenuOpen(false);
    }
  };
  /** 외부 클릭 시 드롭다운 닫기 */
  useOutsideClick([wrapperRef, menuRef], handleOutsideClickCallback);

  /** Menu 열기/닫기 토글 함수 */
  const toggleMenu = () => {
    if (!disabled) setIsMenuOpen((prev) => !prev);
  };

  /** `MenuItemProps`를 `ChipProps`로 매핑하는 함수 */
  const mapMenuToChips = (
    items: { id: string; label: string }[],
  ): (ChipProps & { id: string })[] => {
    return items.map((item, index) => ({
      id: item.id,
      label: item.label,
      disabled: disabled,
      size: 'xs',
      trailingIcon: { iconName: 'xmark' },
      onClick: () => {
        if (onChangeValueHandler) {
          onChangeValueHandler(items.filter((_, i) => i !== index).map((li) => li.id));
        }
      },
    }));
  };

  /** selectedIds 값 변경 핸들러 */
  const onChangeValueHandler = (value: string[]) => {
    setSelectedIds(value);
    if (value && !multiSelect) setIsMenuOpen(false);
  };

  useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [selectedIds]);

  return (
    <div className={clsx(style['dropdown-container'])}>
      {showLabel && (
        <FormLabel labelText={labelText} isTooltip={isTooltip} tooltipProps={tooltipProps} />
      )}
      <div
        ref={wrapperRef}
        className={clsx(
          style['dropdown-wrapper'],
          style[`size-${size}`],
          disabled ? style.disabled : style.state,
          !multiSelect && negative && style.negative,
          isMenuOpen && style.focused,
        )}
        onClick={toggleMenu}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        {multiSelect && selectedIds.length > 0 ? (
          <div className={style['dropdown-chip-group-wrapper']} data-testid='dropdown-chip-group'>
            <ChipGroup
              selectable={false}
              chips={mapMenuToChips(selectedItems)}
              gradientColor={!isFocused ? '#fff' : '#f0f0f0'}
              gradientTrailing
              gradientLeading
              {...chipProps}
            />
          </div>
        ) : (
          <p className={clsx(style['dropdown-input'], !isSelected && style.placeholder)}>
            {isSelected ? selectedItems[0].label : placeholder}
          </p>
        )}

        <div className={clsx(style['dropdown-icon'], disabled ? style.disabled : style.state)}>
          <Icon iconName='angle-down' />
        </div>
      </div>

      {isMenuOpen &&
        createPortal(
          <div ref={menuRef} className={style['dropdown-menu']} style={menuStyle}>
            <Menu
              onSelectionChange={onChangeValueHandler}
              selectedIds={selectedIds}
              size={size}
              multiSelect={multiSelect}
              menus={menus}
              {...menuProps}
            />
          </div>,
          document.body,
        )}

      {helperText && <FormHelper helperText={helperText} negative={negative} />}
    </div>
  );
};

export default Dropdown;
