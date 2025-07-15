import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SnackBarProvider, useSnackBar } from '@/contexts/snackBar';

import SnackBar from './SnackBar';
import { SnackBarDefaultMetaData } from './SnackBar.meta';
import type { SnackBarProps } from './SnackBar.types';
import { TextButton } from '../Button';
import type { ExtendIconProps } from '../Icon/Icon.types';

type SnackBarExtendIcon = ExtendIconProps<SnackBarProps, 'icon'>;

const meta: Meta<SnackBarExtendIcon> = {
  title: 'Components/Feedback/SnackBar',
  component: SnackBar,
  parameters: {
    docs: {
      description: {
        component:
          '스낵바(Snack bar)는 짧은 메시지를 표시하는 데 사용되는 비모달, 시간 기반 창 요소입니다. 일반적으로 화면 하단에 나타나고 3~5초 후에 사라집니다.',
      },
    },
  },
  ...SnackBarDefaultMetaData,
};

export default meta;

const vertical: SnackBarProps[] = [
  {
    variants: 'normal',
    icon: {},
  },
  {
    variants: 'success',
    onClose: () => {},
  },
  {
    variants: 'cautionary',
    trailingButtonLabel: '새로고침',
    trailingButtonClick: () => {},
  },
  {
    variants: 'negative',
    onClose: () => {},
  },
];
export const AllVariants = (params: SnackBarExtendIcon): ReactElement => {
  const { iconName, iconVariants, iconSrc } = params;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {vertical.map((props, index) => (
        <SnackBar
          key={index}
          {...props}
          {...params}
          icon={props.icon && { iconName, variants: iconVariants, src: iconSrc }}
        />
      ))}
    </div>
  );
};

type Story = StoryObj<SnackBarExtendIcon>;
export const Primary: Story = {
  args: {
    trailingButtonLabel: '새로고침',
    trailingButtonClick: () => {
      console.log('새로고침 버튼 클릭');
    },
  },
};

export const Secondary: Story = {
  args: {
    onClose: () => {},
  },
};

// 스낵바 Provider 예시

const MyComponentUsingSnackBar = () => {
  const { showSnackBar, hideSnackBar } = useSnackBar();
  const handleShowToast = () => {
    // Toast bar (자동으로 닫힘)
    showSnackBar({
      label: '자동으로 닫히는 메시지입니다.',
      icon: { iconName: 'check', alt: '성공' },
      duration: 3000, // 3초 후 자동 닫힘
    });
  };
  const handleShowSnackBarWithAction = () => {
    // Snack bar with action (수동으로 닫아야 함)
    showSnackBar({
      label: '실행 취소 버튼을 눌렀을 때 닫기 처리를 하지않으면 스낵바는 닫히지 않습니다.',
      trailingButtonLabel: '실행 취소',
      trailingButtonClick: (id?: string) => {
        console.log('실행 취소 클릭', id);
        if (id) hideSnackBar(id);
      },
      onClose: () => {
        console.log('닫기 버튼 클릭');
      },
    });
  };
  const handleShowSnackBarWithClose = () => {
    // Close button이 있는 Snack bar (자동으로 닫히지 않음)
    showSnackBar({
      label: '닫기 버튼을 눌러야 닫힙니다.',
      icon: { iconName: 'warning', alt: '경고' },
      onClose: () => {
        console.log('닫기 버튼 클릭');
      },
    });
  };
  return (
    <div>
      <p>
        Toast SnackBar: <TextButton onClick={handleShowToast}>Open</TextButton>
      </p>
      <p>
        Use TrailingButton <TextButton onClick={handleShowSnackBarWithAction}>Open</TextButton>
      </p>
      <p>
        Use Close Button <TextButton onClick={handleShowSnackBarWithClose}>Open</TextButton>
      </p>
    </div>
  );
};
/**
 * SnackBarProvider를 사용하여 기능과 함께 SnackBar를 제공하는 컴포넌트입니다.
 * @returns
 */
export const WithSnackBarProvider = (): ReactElement => (
  <SnackBarProvider>
    <MyComponentUsingSnackBar />
  </SnackBarProvider>
);
