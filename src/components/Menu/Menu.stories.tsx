import { type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { clsx } from 'clsx';

import type { ExtendIconProps } from '@/components/Icon/Icon.types';

import { Menu } from './index';
import { MenuItem } from './Menu';
import { menuItemMetaData, menuMetaData } from './Menu.meta';
import style from './Menu.module.scss';
import type { MenuItemProps, MenuProps, MenuSize } from './Menu.types';

type MenuItemExtendProps = ExtendIconProps<MenuItemProps, 'leadingContent' | 'trailingIcon'>;
/**
 * Storybook 메타 정보 (컴포넌트 설명 및 정렬)
 */
const meta: Meta = {
  title: 'Components/Menu/Menu',
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 선택할 수 있는 여러 옵션이나 기능을 나열한 인터페이스 요소이며, 다중 선택이 가능합니다. 주로 Dropdown과 함께 사용합니다.',
      },
    },
  },
};
export default meta;

const verticalVariants: MenuSize[] = ['s', 'm', 'l'];

type Story = StoryObj<MenuProps>;

/**
 * Menu 전체 케이스 렌더링 (단일 선택 / 다중 선택)
 */
export const AllVariants: Story = {
  ...menuMetaData,
  render: (args: MenuProps): ReactElement => {
    return (
      <div className='flex-column' style={{ gap: 16 }}>
        <h4>단일 선택 메뉴</h4>
        <div className='flex-row'>
          {verticalVariants.map((size, index) => (
            <div
              key={`menu-component-${size}-${index}`}
              style={{ width: 240, zIndex: verticalVariants.length - index }}
            >
              <Menu {...args} size={size} />
            </div>
          ))}
        </div>
        <h4>다중 선택 메뉴</h4>
        <div className='flex-row'>
          {verticalVariants.map((size, index) => (
            <div
              key={`menu-component-multi-${size}-${index}`}
              style={{ width: 240, zIndex: verticalVariants.length - index }}
            >
              <Menu {...args} size={size} multiSelect />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

type StorySub = StoryObj<MenuItemExtendProps>;

/**
 * Menu 컴포넌트 내부 Cell 스토리
 */
export const Cell: StorySub = {
  ...menuItemMetaData,
  render: ({
    leadingContentName,
    leadingContentVariants,
    leadingContentSrc,
    trailingIconName,
    trailingIconVariants,
    trailingIconSrc,
    ...args
  }) => (
    <div
      className={style['menu-list-container']}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        maxWidth: 400,
      }}
    >
      <ul className={clsx(style['menu-list-wrapper'], style[`size-s`])}>
        <MenuItem
          {...args}
          leadingContent={{
            iconName: leadingContentName,
            variants: leadingContentVariants,
            src: leadingContentSrc,
          }}
          trailingIcon={{
            iconName: trailingIconName,
            variants: trailingIconVariants,
            src: trailingIconSrc,
          }}
        />
      </ul>
    </div>
  ),
};
