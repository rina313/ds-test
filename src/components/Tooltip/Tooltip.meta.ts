import type { Meta } from '@storybook/react/*';

export const TooltipDefaultMetaData: Meta = {
  args: {
    variants: 'bk',
    size: 's',
    arrow: true,
    arrowDistance: 4,
    placement: 'down-left',
    label: '툴팁 메세지를 표시합니다.',
    open: undefined,
    onOpen: undefined,
    onClose: undefined,
    children: undefined,
    trailingButton: undefined,
    actionButton: undefined,
  },
  argTypes: {
    variants: {
      control: { type: 'select' },
      options: ['bk', 'wt'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bk' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 's' },
      },
    },
    arrow: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    arrowDistance: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
      description: '설명',
    },
    placement: {
      control: { type: 'select' },
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
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'down-left' },
      },
      description: '설명',
    },
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'defaultValue' },
      },
      description: '설명',
    },
    open: {
      control: { type: 'select' },
      options: [undefined, true, false],
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
      description: `외부 데이터를 최우선 순위로 적용시키므로 hover 기능을 테스트하려면 undefined로 선택해야 합니다.`,
    },
    onOpen: {
      control: false,
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      control: false,
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'ReactNode' },
      },
    },
    trailingButton: {
      control: false,
      table: {
        type: { summary: 'ReactElement' },
        defaultValue: { summary: 'undefined' },
      },
      description:
        'label의 오른쪽 상단에 위치한 버튼으로 위치를 잡는 역할을 할 뿐 그때그때 필요한 버튼 컴포넌트를 넘겨준다.',
    },
    actionButton: {
      control: false,
      table: {
        type: { summary: 'ReactElement' },
        defaultValue: { summary: 'undefined' },
      },
      description:
        'label의 하단에 위치한 버튼으로 위치를 잡는 역할을 할 뿐 그때그때 필요한 버튼 컴포넌트를 넘겨준다.',
    },
  },
};
