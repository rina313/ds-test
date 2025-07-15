import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import SectionMessage from './SectionMessage';
import { SectionMessageDefaultMetaData } from './SectionMessage.meta';
import type { SectionMessageProps } from './SectionMessage.types';
import { TextButton } from '../Button';
import type { ExtendIconProps } from '../Icon/Icon.types';

type SectionMessageExtendIcon = ExtendIconProps<SectionMessageProps, 'icon'>;

const meta: Meta<SectionMessageExtendIcon> = {
  title: 'Components/Feedback/SectionMessage',
  component: SectionMessage,
  parameters: {
    docs: {
      description: {
        component:
          '특정 섹션이나 영역 내에서 중요한 정보나 피드백을 전달하여 사용자가 필요한 행동을 취할 수 있도록 돕는 메시지입니다. ',
      },
    },
  },
  ...SectionMessageDefaultMetaData,
};

export default meta;

export const AllVariants = (params: SectionMessageExtendIcon): ReactElement => {
  const { icon, iconName, iconVariants, iconSrc } = params;
  return (
    <div>
      <p>Empty</p>
      <SectionMessage
        {...params}
        icon={{
          ...icon,
          iconName: iconName,
          variants: iconVariants,
          src: iconSrc,
        }}
      />
      <p style={{ marginTop: '10px' }}>Horizontal</p>
      <SectionMessage
        {...params}
        icon={{
          ...icon,
          iconName: iconName,
          variants: iconVariants,
          src: iconSrc,
        }}
        trailingChildren={
          <div style={{ display: 'flex', gap: '10px' }}>
            <TextButton>버튼명</TextButton>
            <TextButton>자세히</TextButton>
          </div>
        }
      />
      <p style={{ marginTop: '10px' }}>Vertical</p>
      <SectionMessage
        {...params}
        icon={{
          ...icon,
          iconName: iconName,
          variants: iconVariants,
          src: iconSrc,
        }}
        variants='vertical'
        trailingChildren={<TextButton variants='primary'>자세히</TextButton>}
      />
    </div>
  );
};

export const Measurements = (params: SectionMessageExtendIcon): ReactElement => {
  const { icon, iconName, iconVariants, iconSrc } = params;
  return (
    <>
      <p>Empty</p>
      <div style={{ color: '#0054D1' }}>
        <SectionMessage
          {...params}
          icon={{
            ...icon,
            iconName: iconName,
            variants: iconVariants,
            src: iconSrc,
          }}
          trailingChildren={<TextButton variants='primary'>자세히</TextButton>}
        />
      </div>
    </>
  );
};

type Story = StoryObj<SectionMessageExtendIcon>;
const renderFunction = (args: SectionMessageExtendIcon): ReactElement => {
  const { icon, iconName, iconVariants, iconSrc } = args;
  return (
    <SectionMessage
      {...args}
      icon={{
        ...icon,
        iconName: iconName,
        variants: iconVariants,
        src: iconSrc,
      }}
    />
  );
};

export const Layout: Story = {
  args: {
    iconName: 'expand',
  },
  render: renderFunction,
};
