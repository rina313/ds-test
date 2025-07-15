import type { Meta } from '@storybook/react/*';

import { getIconMeta } from '../Icon/Icon.meta';

const iconMeta = getIconMeta('icon', 'expand');

export const SnackBarDefaultMetaData: Meta = {
  args: {
    label: '스낵바메세지가 표시됩니다.',
    ...iconMeta.args,
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    trailingButtonLabel: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description: 'Trailing Button의 label이며 label이 없으면 활성화되지 않습니다.',
    },
    trailingButtonClick: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description:
        'Trailing Button이 포함되어 있지 않은 경우 Toast bar의 역할을 하며, 자동으로 닫힐 수 있습니다.' +
        '동작이 있는 스낵바는 사용자가 스낵바에서 동작을 취하거나 해제할 때까지 화면에 남아 있어야 합니다.',
    },
    onClose: {
      control: false,
      description: 'Close Button이 포함되어 있는 경우 Snack bar가 자동으로 닫히지 않습니다.',
    },
    ...iconMeta.argTypes,
  },
};
