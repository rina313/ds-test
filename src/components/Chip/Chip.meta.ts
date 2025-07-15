import type { Meta } from '@storybook/react/*';

import { getIconMeta } from '../Icon/Icon.meta';

const leadingIcon = getIconMeta('leadingIcon');
const trailingIcon = getIconMeta('trailingIcon');

export const chipDefaultMetaData: Meta = {
  args: {
    label: '버튼명',
    disabled: false,
    size: 'm',
    active: false,
    variants: 'primary',
    onClick: undefined,
    leadingClick: undefined,
    trailingClick: undefined,
    ...leadingIcon.args,
    ...trailingIcon.args,
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'radio',
      options: ['xs', 's', 'm'],
      table: {
        type: { summary: `'xs' | 's' | 'm'` },
      },
    },
    active: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    variants: {
      control: 'radio',
      options: ['primary', 'secondary'],
      table: {
        type: { summary: `'primary' | 'secondary'` },
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    leadingClick: {
      action: 'leading clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    trailingClick: {
      action: 'trailing clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    ...leadingIcon.argTypes,
    ...trailingIcon.argTypes,
  },
};
