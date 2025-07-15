/**
 * stories에서 사용하는 argTypes, args 등의 값
 */

import type { Meta } from '@storybook/react/*';

import { getIconMeta } from '../Icon/Icon.meta';

const leadingIcon = getIconMeta('leadingIcon', 'expand');
const trailingIcon = getIconMeta('trailingIcon', 'expand');

export const buttonDefaultMetaData: Meta = {
  args: {
    children: '버튼명',
    disabled: false,
    variants: 'primary',
    ...leadingIcon.args,
    ...trailingIcon.args,
  },
  argTypes: {
    children: {
      control: 'text',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    variants: {
      control: 'radio',
      options: ['primary', 'secondary'],
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['s', 'm', 'l'],
    },
    leadingIcon: {
      control: 'select',
      table: {
        type: { summary: 'string' },
      },
    },
    trailingIcon: {
      control: 'select',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '버튼이 비활성화된 상태인지 여부',
    },
    ...leadingIcon.argTypes,
    ...trailingIcon.argTypes,
  },
};

export const solidOutlineMetaData: Meta = {
  argTypes: {
    ...buttonDefaultMetaData.argTypes,
    iconOnly: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    ...buttonDefaultMetaData.args,
    iconOnly: false,
  },
};

export const textButtonMetaData: Meta = {
  args: {
    ...buttonDefaultMetaData.args,
    size: 'm',
    active: false,
  },
  argTypes: {
    ...buttonDefaultMetaData.argTypes,
    size: {
      control: 'radio',
      options: ['s', 'm', 'l'],
      table: {
        type: { summary: 's | m | l' },
        defaultValue: { summary: 'm' },
      },
    },
    active: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '버튼이 활성화된 상태인지 여부<br/> href값이 있는 경우의 :visited 상태와 동일',
    },
    href: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#' },
      },
      description: 'href 속성이 있는 경우, a 태그로 렌더링',
    },
  },
};

const iconMeta = getIconMeta('icon', 'expand');
export const iconButtonMetaData: Meta = {
  args: {
    variants: 'primary',
    size: 'm',
    disabled: false,
    badge: false,
    ...iconMeta.args,
  },
  argTypes: {
    variants: {
      control: 'radio',
      options: ['primary', 'secondary'],
      table: {
        type: { summary: 'primary | secondary' },
      },
    },
    size: {
      control: 'radio',
      options: ['s', 'm', 'l', 'xl'],
      table: {
        type: { summary: 'm' },
      },
    },
    badge: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'false' },
      },
    },
    className: {
      control: false,
      table: {
        type: { summary: 'string' },
      },
    },
    ...iconMeta.argTypes,
  },
};
