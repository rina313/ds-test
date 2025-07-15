import type { Meta } from '@storybook/react/*';

import { Icon } from '@/components/Icon';
import { getIconMeta } from '@/components/Icon/Icon.meta';

import style from './style.module.scss';

const leadingIcon = getIconMeta('leadingIcon', 'plus');
const trailingIcon = getIconMeta('trailingIcon');

const BoxContainer = ({ children }: { children: React.ReactNode }) => (
  <div className={style['sample-box-container']}>{children}</div>
);
const SampleIcon = () => (
  <BoxContainer>
    <Icon variants='fa-regular' iconName='file-lines' />
  </BoxContainer>
);

const SampleImage = () => (
  <BoxContainer>
    <img
      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVYS7KEXYFAwqdRCW81e4DSR_nSLYSFStx1Q&s'
      alt='sample image'
    />
  </BoxContainer>
);
export const emptyStateMetaData: Meta = {
  argTypes: {
    children: {
      control: 'select',
      options: ['없음', '이미지', '아이콘'],
      mapping: {
        없음: undefined,
        이미지: <SampleImage />,
        아이콘: <SampleIcon />,
      },
      description:
        '타이틀 상단에 위치할 영역입니다. <br />이미지, 아이콘 등 다양한 요소를 포함할 수 있습니다.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    title: {
      control: 'text',
      description: '타이틀이 들어가는 영역입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    subTitle: {
      control: 'text',
      description: '타이틀 하단에 위치할 영역입니다. <br />빈 화면에 대한 설명이 들어갑니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    button: {
      control: false,
      description: '하단의 버튼 영역입니다.',
      table: {
        type: { summary: 'ReactElement' },
        category: 'button',
      },
    },
    buttonChildren: {
      name: 'button.children',
      control: 'text',
      description: '버튼의 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        category: 'button',
      },
    },
    buttonVariants: {
      name: 'button.variants',
      control: 'select',
      options: ['primary', 'secondary'],
      description: '버튼의 타입입니다.',
      table: {
        type: { summary: 'primary | secondary' },
        category: 'button',
      },
    },
    buttonIconOnly: {
      name: 'button.iconOnly',
      control: 'boolean',
      description: '버튼이 아이콘만 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        category: 'button',
      },
    },
    buttonIsDisabled: {
      name: 'button.isDisabled',
      control: 'boolean',
      description: '버튼이 비활성화 상태 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        category: 'button',
      },
    },
    buttonSize: {
      name: 'button.size',
      control: 'select',
      options: ['s', 'm', 'l'],
      description: '버튼의 크기입니다.',
      table: {
        type: { summary: 's | m | l' },
        category: 'button',
      },
    },
    ...leadingIcon.argTypes,
    ...trailingIcon.argTypes,
  },
  args: {
    children: undefined,
    title: '타이틀이 들어가는 영역',
    subTitle: '빈 화면에 대한 설명이 들어가요\n설명은 최대 두 줄로 작성해요',
    button: undefined,
    buttonChildren: '버튼명',
    buttonIconOnly: false,
    buttonIsDisabled: false,
    buttonVariants: 'secondary',
    buttonSize: 'm',
    ...leadingIcon.args,
    ...trailingIcon.args,
  },
};
