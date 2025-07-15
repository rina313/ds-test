import React, { useEffect, useRef, useState, type ReactElement } from 'react';

import { clsx } from 'clsx';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/Icon';
import type { IconProps } from '@/components/Icon/Icon.types';
import { useSelectController } from '@/hooks/useSelectController';
import { warn } from '@/utils/logger';
import { MENU_INVALID_CONTROL_PROPS } from '@/utils/logger/message';

import style from './Menu.module.scss';
import type { MenuItemProps, MenuListProps, MenuProps } from './Menu.types';

/**
 * Menu (최상위 - 상태 관리)
 * └── handleItemSelect 함수 생성
 * └── onSelectionChange로 외부 상태와 연동 가능
 *
 * MenuList (재귀 컴포넌트)
 * └── onItemSelect={handleItemSelect} 로 전달
 *
 * MenuItem (개별 아이템)
 * └── onSelect={onItemSelect} 로 다시 전달
 *     └── 클릭 시 onSelect(item.id) 호출
 *
 * MenuItem의 자식 MenuList (재귀!)
 * └── onItemSelect={onItemSelect} 로 또 전달
 */
export default function Menu({
  menus,
  selectedIds: initSelectedIds,
  onSelectionChange,
  multiSelect = false,
  ...props
}: MenuProps): ReactElement {
  const openMenuRefs = useRef<HTMLElement[]>([]); // 전역 메뉴 DOM 목록
  if (onSelectionChange && initSelectedIds === undefined) {
    warn(MENU_INVALID_CONTROL_PROPS, {
      onSelectionChange: typeof onSelectionChange,
      initSelectedIds,
    });
  }
  const { selectedIds, toggle } = useSelectController({
    selectedIds: initSelectedIds,
    multiSelect,
    onSelectionChange: onSelectionChange,
  });

  return (
    <MenuList
      menus={menus}
      onItemSelect={toggle}
      selectedIds={selectedIds}
      multiSelect={multiSelect}
      openMenuRefs={openMenuRefs}
      {...props}
    />
  );
}

function MenuList({
  menus,
  className,
  selectedIds = [],
  onItemSelect,
  maxHeight,
  size = 'l',
  multiSelect,
  activeArea,
  openMenuRefs,
  style: subMenuStyle = {},
}: MenuListProps & { openMenuRefs?: React.RefObject<HTMLElement[]> }): ReactElement {
  return (
    <div
      // 드롭다운 외부 영역 클릭 시 메뉴 닫기 용도로 추가 (필수 속성)
      data-type='dropdown-menu'
      className={clsx(style['menu-list-container'], className)}
      style={{ ...subMenuStyle }}
    >
      <ul
        className={clsx(style['menu-list-wrapper'], style[`size-${size}`])}
        style={{ ...(maxHeight && { maxHeight }) }}
      >
        {/* 메뉴 아이템 목록 렌더링 */}
        {menus.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isSelected={selectedIds.includes(item.id)}
            selectedIds={selectedIds}
            onSelect={onItemSelect}
            onItemSelect={onItemSelect}
            size={size}
            multiSelect={multiSelect}
            maxHeight={maxHeight}
            openMenuRefs={openMenuRefs}
          />
        ))}
      </ul>
      {activeArea && (
        <div className={clsx(style['active-area'], style[`size-${size}`])}>{activeArea}</div>
      )}
    </div>
  );
}

const ContentComponent = ({
  name,
  type,
}: {
  name: IconProps | ReactElement;
  type: 'leading' | 'trailing';
}) => (
  <div className={clsx(style['label-icon-box'], style[type])}>
    {'iconName' in name ? <Icon {...name} /> : (name as React.ReactNode)}
  </div>
);

export function MenuItem({
  id,
  label,
  subMenu,
  isSelected = false,
  onSelect,
  onItemSelect,
  title,
  leadingContent,
  description,
  trailingIcon,
  hasDivider = false,
  disabled = false,
  multiSelect,
  openMenuRefs,
  ...props
}: MenuItemProps & { openMenuRefs?: React.RefObject<HTMLElement[]> }): ReactElement {
  const liRef = useRef<HTMLLIElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const [subMenuStyle, setSubMenuStyle] = useState<React.CSSProperties>({});
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const hasSubMenu = subMenu && subMenu.length > 0;
  const isMultiSelected = isSelected && multiSelect;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (subMenu || disabled) return; // 서브메뉴가 있는 경우 클릭 이벤트 무시
    onSelect?.(id);
  };

  const handleMouseEnter = () => {
    if (liRef.current && subMenu?.length) {
      const rect = liRef.current.getBoundingClientRect();
      setSubMenuStyle({
        display: 'block',
        width: rect.width + 12,
        top: rect.top + rect.height / 2,
        left: rect.right,
      });
      setShowSubMenu(true);
    }
  };

  /** 서브메뉴가 열릴 때 해당 메뉴 DOM을 openMenuRefs에 추가 */
  useEffect(() => {
    const el = subMenuRef.current;
    if (showSubMenu && el && openMenuRefs?.current) {
      openMenuRefs.current.push(el);
    }

    return () => {
      if (el && openMenuRefs?.current) {
        const index = openMenuRefs.current.indexOf(el);
        if (index > -1) {
          openMenuRefs.current.splice(index, 1);
        }
      }
    };
  }, [showSubMenu, openMenuRefs]);

  /** 서브메뉴 이외의 영역 호버 시 메뉴 컴포넌트 숨기기 */
  useEffect(() => {
    if (!liRef.current || !showSubMenu) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!openMenuRefs?.current) return;

      const target = e.target as Node;
      const li = liRef.current;
      /** openMenuRefs에 추가된 DOM 리스트 영역 호버 체크 */
      const isInside = openMenuRefs.current.some((ref) => {
        return ref.contains(target);
      });
      if (!(li && li.contains(target)) && !isInside) {
        setShowSubMenu(false);
      }
    };

    if (showSubMenu) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showSubMenu]);

  return (
    <li ref={liRef} className={clsx(style['menu-item'], hasSubMenu && style['menu-item-sub-icon'])}>
      {title && <span className={style['label-title']}>{title}</span>}
      <div
        className={clsx(
          style['label-container'],
          isSelected && style.selected,
          disabled && style.disabled,
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {leadingContent && <ContentComponent name={leadingContent} type='leading' />}
        <span className={style['label-text-wrapper']}>
          <p className={style['label-text']}>{label}</p>
          <p className={style['label-description']}>{description}</p>
        </span>
        {(isMultiSelected || trailingIcon) && (
          <ContentComponent
            name={isMultiSelected ? { ...trailingIcon, iconName: 'check' } : trailingIcon || {}}
            type='trailing'
          />
        )}
        {hasSubMenu && (
          <div className={clsx(style['label-icon-box'], style['subMenu'])}>
            <Icon iconName='chevron-right' className={style['primary-color']} />
          </div>
        )}
      </div>
      {hasDivider && <div className={style.divider} />}
      {showSubMenu &&
        hasSubMenu &&
        createPortal(
          <div ref={subMenuRef}>
            <MenuList
              menus={subMenu}
              onItemSelect={onItemSelect}
              multiSelect={multiSelect}
              style={subMenuStyle}
              className={style['sub-menu']}
              openMenuRefs={openMenuRefs}
              {...props}
            />
          </div>,
          document.body,
        )}
    </li>
  );
}
