/**
 * stories에서 사용하는 argTypes, args 등의 값
 */
import type { Meta } from '@storybook/react/*';

import { SolidButton } from '@/components/Button';
import { getIconMeta } from '@/components/Icon/Icon.meta';
import { Radio } from '@/components/SelectionControls';
import { normalizeOptions } from '@/utils';

import type { MenuItemProps, MenuProps } from './Menu.types';

const leadingContentIconMeta = getIconMeta('leadingContent', 'expand');
const trailingIconMeta = getIconMeta('trailingIcon', 'check');

const initmenus = normalizeOptions([
  {
    label: '텍스트 입력1',
    description: '설명 입력란',
    trailingIcon: { iconName: 'check' },
    hasDivider: true,
    leadingContent: { iconName: 'check' },
    disabled: true,
  },
  { label: '텍스트 입력2', leadingContent: { iconName: 'expand' } },
  { label: '텍스트 입력3' },
  { label: '텍스트 입력4' },
  { label: '텍스트 입력5', disabled: true },
  { label: '텍스트 입력6', leadingContent: { iconName: 'expand' } },
  {
    label: '텍스트 입력7',
    leadingContent: { iconName: 'expand' },
    subMenu: [
      {
        id: 'text-input-11',
        label: '텍스트 입력11',
        leadingContent: { iconName: 'expand' },
        trailingIcon: { iconName: 'check' },
        disabled: true,
      },
      {
        id: 'text-input-333',
        label: '텍스트 입력333',
        leadingContent: { iconName: 'expand' },
        trailingIcon: { iconName: 'check' },
      },
      {
        id: 'text-input-114',
        label: '텍스트 입력114',
        leadingContent: { iconName: 'expand' },
        trailingIcon: { iconName: 'check' },
      },
      {
        id: 'text-input-12',
        label: '텍스트 입력12',
        subMenu: [
          {
            id: 'text-input-21',
            label: '텍스트 입력21',
            description: '설명 입력란',
            leadingContent: <Radio checked={true} onClick={() => {}} />,
          },
          { id: 'text-input-32', label: '텍스트 입력32' },
          { id: 'text-input-33', label: '텍스트 입력33' },
          { id: 'text-input-34', label: '텍스트 입력34' },
          { id: 'text-input-35', label: '텍스트 입력35' },
          { id: 'text-input-36', label: '텍스트 입력36' },
          { id: 'text-input-23', label: '텍스트 입력23' },
          { id: 'text-input-24', label: '텍스트 입력24' },
          { id: 'text-input-25', label: '텍스트 입력25' },
          { id: 'text-input-26', label: '텍스트 입력26' },
          {
            id: 'text-input-22',
            label: '텍스트 입력22',
            subMenu: [
              {
                id: 'text-input-31',
                label: '텍스트 입력31',
                description: '설명 입력란',
                leadingContent: <Radio checked={true} onClick={() => {}} />,
              },
            ],
          },
        ],
      },
      { id: 'text-input-13', label: '텍스트 입력13' },
      { id: 'text-input-14', label: '텍스트 입력14' },
    ],
  },
  { label: '텍스트 입력8' },
  { label: '텍스트 입력9' },
  { label: '텍스트 입력10' },
]) as MenuItemProps[];

export const menuItemMetaData: Meta<MenuItemProps> = {
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    label: {
      name: 'cell.label',
      control: 'text',
      description: 'option 이름',
      table: { category: 'cell' },
    },
    title: {
      name: 'cell.title',
      control: 'text',
      description: 'option 상단 라벨',
      table: { category: 'cell' },
    },
    description: {
      name: 'cell.description',
      control: 'text',
      description: 'option 하단 설명',
      table: { category: 'cell' },
    },
    subMenu: {
      table: {
        disable: true,
      },
    },
    hasDivider: {
      name: 'cell.hasDivider',
      control: 'boolean',
      description: 'label 하단 선 노출 여부',
      table: {
        type: { summary: 'boolean' },
        category: 'cell',
      },
    },
    disabled: {
      name: 'cell.disabled',
      control: 'boolean',
      description: 'boolean 여부',
      table: {
        type: { summary: 'boolean' },
        category: 'cell',
      },
    },
    ...leadingContentIconMeta.argTypes,
    ...trailingIconMeta.argTypes,
  },
  args: {
    label: '텍스트 입력',
    description: '설명 입력란 입니다',
    title: 'label',
    subMenu: undefined,
    hasDivider: false,
    disabled: false,
    ...leadingContentIconMeta.args,
    ...trailingIconMeta.args,
  },
};

export const menuMetaData: Meta<MenuProps> = {
  argTypes: {
    menus: {
      name: 'menu.menus',
      control: false,
      description: '메뉴 옵션 리스트',
      table: {
        category: 'menu',
      },
    },
    onSelectionChange: {
      table: {
        disable: true,
      },
    },
    selectedIds: {
      table: {
        disable: true,
      },
    },

    maxHeight: {
      name: 'menu.maxHeight',
      control: 'number',
      description: '메뉴 최대 높이 / 해당 값 유무로 스크롤 여부 체크',
      table: {
        type: {
          summary: 'number',
        },
        category: 'menu',
      },
    },
    size: {
      name: 'menu.size',
      control: 'select',
      options: ['s', 'm', 'l'],
      description: '메뉴 사이즈',
      table: {
        type: {
          summary: `s | m | l`,
        },
        category: 'menu',
      },
    },

    activeArea: {
      name: 'menu.activeArea',
      description: '하단 active 영역 활성화 유무',
      options: ['없음', 'TextWithButton', 'OnlyButton'],
      mapping: {
        없음: undefined,
        TextWithButton: (
          <>
            <p>텍스트 입력</p>
            <SolidButton>버튼명</SolidButton>
          </>
        ),
        OnlyButton: <SolidButton>버튼명</SolidButton>,
      },
      control: {
        type: 'select',
      },
      table: {
        type: { summary: 'ReactElement' },
        category: 'menu',
      },
    },
    ...menuItemMetaData.argTypes,
  },
  args: {
    menus: initmenus,
    maxHeight: 0,
    size: 'm',
    activeArea: undefined,
    ...menuItemMetaData.args,
  },
};
