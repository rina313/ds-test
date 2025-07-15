import type { Meta } from '@storybook/react/*';

import { getIconMeta } from '@/components/Icon/Icon.meta';

import type { SearchInputProps } from './SearchInput.types';

const trailingContentMeta = getIconMeta('trailingContent', 'expand');

export const searchInputMetaData: Meta<SearchInputProps> = {
  argTypes: {
    value: {
      control: 'text',
      description: '입력창의 입력 값',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: '입력창 비활성화 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: '입력창 사이즈',
      table: {
        type: {
          summary: 's | m | l',
        },
      },
    },
    ...trailingContentMeta.argTypes,
    backButton: {
      control: 'boolean',
      description: '입력창 좌측 뒤로가기 버튼 핸들러',
      mapping: {
        true: () => console.log('back button clicked'),
        false: undefined,
      },
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    closeButton: {
      control: 'boolean',
      description: '입력창 우측 닫기 버튼 핸들러',
      mapping: {
        true: () => console.log('close button clicked'),
        false: undefined,
      },
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    value: '',
    placeholder: '검색어를 입력해주세요',
    disabled: false,
    size: 'l',
    ...trailingContentMeta.args,
    backButton: undefined,
    closeButton: undefined,
  },
};
