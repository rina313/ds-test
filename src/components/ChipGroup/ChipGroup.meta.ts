import type { Meta } from '@storybook/react/*';

import type { ChipGroupProps } from './ChipGroup.types';
import { getIconMeta } from '../Icon/Icon.meta';

const trailingButtonIcon = getIconMeta('trailingButtonIcon');

export const chipGroupDefaultMetaData: Meta<ChipGroupProps> = {
  args: {
    variants: 'primary',
    size: 'm',
    paddingVariants: false,
    paddingHorizontal: false,
    gradientLeading: false,
    gradientTrailing: false,
    trailingButtonClick: undefined,
    gradientColor: '#fff',
    multiple: false,
    chips: [],
    selectedChipIds: undefined,
    onSelectionChange: undefined,
    selectable: true,
    renderChips: undefined,
    ...trailingButtonIcon.args,
  },
  argTypes: {
    variants: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Chip 스타일을 결정합니다.',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['s', 'm'],
      description: 'Chip 크기를 설정합니다.',
      table: {
        type: { summary: 's | m' },
        defaultValue: { summary: 'm' },
      },
    },
    trailingButtonIcon: {
      control: 'select',
      description: 'ChipGroup 우측 버튼의 아이콘을 설정합니다.',
      table: {
        type: { summary: 'IconName' },
      },
    },
    trailingButtonClick: {
      action: 'trailing button clicked',
      description: 'ChipGroup 우측 버튼의 이벤트를 설정합니다.',
      table: {
        type: { summary: '() => void' },
      },
    },
    paddingVariants: {
      control: 'boolean',
      description: 'Chip 스타일에 따라 다른 padding을 적용합니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    paddingHorizontal: {
      control: 'boolean',
      description: 'ChipGroup 좌우 padding 적용 여부입니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    gradientLeading: {
      control: 'boolean',
      description: 'ChipGroup 좌측에 gradient fade를 적용합니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    gradientTrailing: {
      control: 'boolean',
      description: 'ChipGroup 우측에 gradient fade를 적용합니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    gradientColor: {
      control: 'color',
      description: 'gradient 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#fff' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'true인 경우 여러개의 Chip을 선택할 수 있습니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    chips: {
      control: false,
      description: '렌더링할 Chip들의 배열입니다.',
      table: {
        type: { summary: 'ChipProps[]' },
      },
    },
    selectedChipIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
      },
    },
    onSelectionChange: {
      control: false,
    },
    renderChips: {
      control: false,
    },
    selectable: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ...trailingButtonIcon.argTypes,
  },
};
