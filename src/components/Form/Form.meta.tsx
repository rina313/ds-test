/**
 * stories에서 사용하는 argTypes, args 등의 값
 */
import type { Meta } from '@storybook/react/*';

import { Icon } from '@/components/Icon';
import { getIconMeta } from '@/components/Icon/Icon.meta';
import { menuMetaData } from '@/components/Menu/Menu.meta';
import type { TooltipPlacement } from '@/components/Tooltip/Tooltip.types';

import type {
  DropdownProps,
  FormBaseProps,
  FormLabelProps,
  TextareaProps,
  TextfieldProps,
} from './Form.types';
interface FormLabelExtendsTooltipProps extends FormLabelProps {
  tooltipLabel?: string;
  tooltipSize?: 's' | 'm';
  tooltipVariants?: 'bk' | 'wt';
  tooltipArrow?: boolean;
  tooltipPlacement?: TooltipPlacement;
  tooltipTrailingButton?: boolean;
}
const leadingIconMeta = getIconMeta('leadingIcon', 'expand');

const contentOptions = {
  control: { type: 'select' as const },
  options: ['없음', 'Icon', 'Text', 'Time'],
  mapping: {
    없음: undefined,
    Icon: <Icon iconName='check' />,
    Text: '텍스트',
    Time: '00:00',
  },
  table: {
    type: {
      summary: 'string | ReactElement',
    },
  },
};

const inputDefaultMetaData: Meta = {
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
  },
  args: {
    value: '',
    placeholder: '입력해주세요',
    disabled: false,
  },
};
export const formLabelMetaData: Meta<FormLabelExtendsTooltipProps> = {
  argTypes: {
    labelText: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    isTooltip: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    tooltipProps: {
      name: 'tooltip',
      control: false,
      table: {
        type: { summary: 'TooltipProps' },
        category: 'tooltip',
      },
    },
    tooltipLabel: {
      name: 'tooltip.label',
      control: 'text',
      description: '툴팁에 표시될 텍스트',
      table: {
        type: { summary: 'string' },
        category: 'tooltip',
      },
    },
    tooltipSize: {
      name: 'tooltip.size',
      control: 'select',
      description: '툴팁 사이즈',
      options: ['s', 'm'],
      table: {
        type: { summary: 's | m' },
        category: 'tooltip',
      },
    },
    tooltipVariants: {
      name: 'tooltip.variants',
      control: 'select',
      description: '툴팁 색상 스타일',
      options: ['bk', 'wt'],
      table: {
        type: { summary: 'bk | wt' },
        category: 'tooltip',
      },
    },
    tooltipArrow: {
      name: 'tooltip.arrow',
      control: 'boolean',
      description: '툴팁 화살표의 유무로 default: true',
      table: {
        type: { summary: 'boolean' },
        category: 'tooltip',
      },
    },
    tooltipPlacement: {
      name: 'tooltip.placement',
      control: 'select',
      description: 'arrow 위치값, default: down-left',
      options: [
        'up-left',
        'up-center',
        'up-right',
        'down-left',
        'down-center',
        'down-right',
        'left-up',
        'left-center',
        'left-down',
        'right-up',
        'right-center',
        'right-down',
      ] as TooltipPlacement[],
      table: {
        type: {
          summary:
            'up-left | up-center | up-right | down-left | down-center | down-right | left-up | left-center | left-down | right-up | right-center | right-down',
        },
        category: 'tooltip',
      },
    },
  },
  args: {
    labelText: 'Label',
    isTooltip: false,
    tooltipProps: undefined,
    tooltipLabel: '툴팁 텍스트',
    tooltipSize: 's',
    tooltipVariants: 'bk',
    tooltipArrow: true,
    tooltipPlacement: 'down-left',
  },
};
export const formDefaultMetaData: Meta<FormBaseProps> = {
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
    negative: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    ...formLabelMetaData.argTypes,
    helperText: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  args: {
    negative: false,
    ...formLabelMetaData.args,
    helperText: '',
  },
};

export const textFieldMetaData: Meta<TextfieldProps> = {
  argTypes: {
    ...inputDefaultMetaData.argTypes,
    ...formDefaultMetaData.argTypes,
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      table: {
        type: {
          summary: `s | m | l`,
        },
      },
    },
    ...leadingIconMeta.argTypes,
    trailingBtnText: {
      control: 'text',
    },
    trailingBtnHandler: {
      table: {
        disable: true,
      },
    },

    trailingContent1: {
      ...contentOptions,
      description:
        '입력창 `우측` 컴포넌트 4가지 옵션 중 하나를 선택할 수 있습니다. * 문자열, 타이머, 아이콘',
    },
    trailingContent2: {
      ...contentOptions,
      description:
        '입력창 `우측` 컴포넌트 4가지 옵션 중 하나를 선택할 수 있습니다. * 문자열, 타이머, 아이콘',
    },
    maxCount: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
  },
  args: {
    ...inputDefaultMetaData.args,
    ...formDefaultMetaData.args,
    size: 'l',
    ...leadingIconMeta.args,
    trailingBtnText: '',
    trailingContent1: '없음',
    trailingContent2: '없음',
  },
};

export const textareaMetaData: Meta<TextareaProps> = {
  argTypes: {
    ...inputDefaultMetaData.argTypes,
    ...formDefaultMetaData.argTypes,
    maxCount: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
  },
  args: {
    ...inputDefaultMetaData.args,
    ...formDefaultMetaData.args,
    maxCount: undefined,
  },
};

export const dropdownMetaData: Meta<DropdownProps> = {
  argTypes: {
    ...formDefaultMetaData.argTypes,
    ...menuMetaData.argTypes,
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    multiSelect: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    placeholder: {
      control: 'text',
      description: '드롭다운 플레이스홀더',
    },
    selectedIds: {
      table: {
        disable: true,
      },
    },
    onSelectionChange: {
      table: {
        disable: true,
      },
    },
    chipProps: {
      table: {
        disable: true,
      },
    },
    selectable: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    ...formDefaultMetaData.args,
    ...menuMetaData.args,
    placeholder: '선택해주세요',
    disabled: false,
    multiSelect: false,
  },
};
