import type { Meta } from '@storybook/react/*';

import { getIconMeta } from '../Icon/Icon.meta';

const iconMeta = getIconMeta('icon', 'circle-exclamation');
export const SectionMessageDefaultMetaData: Meta = {
  args: {
    variants: 'horizontal',
    title: '섹션 내에 중요도 있는 메시지를 표시합니다',
    description: '설명이 들어가는 영역',
    trailingChildren: undefined,
    ...iconMeta.args,
  },
  argTypes: {
    variants: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
      description: '설명',
    },
    iconName: {
      control: { type: 'select' },
      table: {
        type: { summary: 'IconName' },
        defaultValue: { summary: 'circle-exclamation' },
      },
      description: '아이콘 이름',
    },
    trailingChildren: {
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
      description: '추가적인 자식 요소',
    },
    title: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      description: '섹션 내에 중요도 있는 메시지를 표시합니다',
    },
    description: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      description: '설명이 들어가는 영역',
    },
    ...iconMeta.argTypes,
  },
};
