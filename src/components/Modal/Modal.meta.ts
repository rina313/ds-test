import type { Meta } from '@storybook/react/*';

export const ModalDefaultMetaData: Meta = {
  args: {
    title: '모달에 알맞는 제목을 작성해주세요.',
    children: `모달에 들어가는 내용입니다. 내용이 영역도 함께 사라집니다.`,
    size: 'm',
    activeOnPrev: false,
    disabledHeader: false,
    onPrev: () => {},
    disabledActionArea: false,
    actionArea: true,
  },
  argTypes: {
    disabledHeader: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'header 영역 비활성화',
    },
    title: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description: '모달 제목',
    },
    activeOnPrev: {
      name: 'onPrev 활성화',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'onPrev 활성화 <br/> onPrev 이벤트를 컨트롤 하기 위한 storybook용 값',
      if: {
        arg: 'disabledHeader',
        truthy: false,
      },
    },
    onPrev: {
      control: false,
      table: {
        type: { summary: 'function' },
      },
      if: {
        arg: 'activeOnPrev',
        truthy: true,
      },
      description: '이전 버튼 클릭 이벤트 핸들러',
    },
    onClose: {
      action: false,
      table: {
        type: { summary: 'function' },
      },
      description: '닫기 버튼 클릭 이벤트 핸들러',
    },
    children: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
      description: '모달 내용',
    },
    size: {
      control: 'radio',
      options: ['m', 'l'],
      table: {
        type: { summary: "'m' | 'l'" },
        defaultValue: { summary: 'm' },
      },
    },
    disabledActionArea: {
      name: 'actionArea 비활성화',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'actionArea 영역을 컨트롤 하기 위한 storybook용 값',
    },
    actionArea: {
      control: 'boolean',
      table: {
        type: { summary: 'ReactNode' },
      },
      description: '모달 하단 액션 영역',
      if: {
        arg: 'disabledActionArea',
        truthy: false,
      },
    },
  },
};
