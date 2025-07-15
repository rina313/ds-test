import { type ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import type { ButtonSize } from '@/components/Button/Button.types';
import type { ExtendIconProps } from '@/components/Icon/Icon.types';

import { emptyStateMetaData } from './EmptyState.meta';
import type { EmptyStateProps } from './EmptyState.types';
import { EmptyState } from './index';

type EmptyStateExtendIconProps = ExtendIconProps<
  EmptyStateProps,
  'leadingIcon' | 'trailingIcon'
> & {
  buttonIconOnly?: boolean;
  buttonChildren?: string;
  buttonVariants?: 'primary' | 'secondary';
  buttonDisabled?: boolean;
  buttonSize?: ButtonSize;
};

const meta: Meta<EmptyStateExtendIconProps> = {
  title: 'Components/Contents/Empty State',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          '페이지 내부에 표시할 수 있는 내용이 없는 경우 사용자의 혼란을 방지하고 행동을 유도하기 위해 사용합니다.<br />Empty state는 Container 내부에서 센터 정렬합니다. ',
      },
    },
  },
  ...emptyStateMetaData,
};
export default meta;

export const Default = ({
  buttonIconOnly,
  buttonChildren,
  buttonVariants,
  buttonDisabled,
  buttonSize,
  trailingIconVariants,
  trailingIconName,
  trailingIconSrc,
  leadingIconName,
  leadingIconSrc,
  leadingIconVariants,
  ...params
}: EmptyStateExtendIconProps): ReactElement => {
  const leadingIcon =
    leadingIconSrc || leadingIconName
      ? {
          variants: leadingIconVariants,
          iconName: leadingIconName,
          src: leadingIconSrc,
        }
      : undefined;
  const trailingIcon =
    trailingIconSrc || trailingIconName
      ? {
          variants: trailingIconVariants,
          iconName: trailingIconName,
          src: trailingIconSrc,
        }
      : undefined;

  return (
    <EmptyState
      {...params}
      button={
        buttonChildren || buttonIconOnly
          ? {
              disabled: buttonDisabled,
              variants: buttonVariants,
              children: buttonChildren,
              iconOnly: buttonIconOnly,
              size: buttonSize,
              trailingIcon: trailingIcon,
              leadingIcon: leadingIcon,
            }
          : undefined
      }
    />
  );
};
