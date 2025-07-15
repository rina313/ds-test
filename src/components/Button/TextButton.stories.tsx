import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { textButtonMetaData } from './Button.meta';
import type { TextButtonProps } from './Button.types';
import { TextButton } from './index';
import type { ExtendIconProps } from '../Icon/Icon.types';

type TextButtonExtendIconProps = ExtendIconProps<TextButtonProps, 'leadingIcon' | 'trailingIcon'>;

const meta: Meta<TextButtonExtendIconProps> = {
  title: 'Components/Buttons/TextButton',
  component: TextButton,
  parameters: {
    docs: {
      description: {
        component:
          '배경색이나 테두리가 없는 버튼으로, 텍스트만으로 구성됩니다. 주로 강조가 덜한 보조적인 액션에 사용합니다. (a태그와 버튼에 모두 사용합니다.)',
      },
    },
  },
  ...textButtonMetaData,
};
export default meta;

const title = ['primary', 'secondary', 'disabled', 'link', 'active'];
const verticalVariants: TextButtonProps[] = [
  { variants: 'primary', disabled: false },
  { variants: 'secondary', disabled: false },
  { disabled: true },
  { href: '#4', target: '_blank' },
  { href: '#5', target: '_blank', active: true },
];
const horizontalVariants: TextButtonProps[] = [
  {},
  { trailingIcon: {} },
  { leadingIcon: {} },
  { trailingIcon: {}, leadingIcon: {} },
  { trailingIcon: {}, size: 'l' },
  { trailingIcon: {}, size: 'm' },
  { trailingIcon: {}, size: 's' },
];
export const AllVariants = (params: TextButtonExtendIconProps): ReactElement => {
  const {
    children,
    trailingIconVariants,
    trailingIconName,
    trailingIconSrc,
    leadingIconName,
    leadingIconSrc,
    leadingIconVariants,
  } = params;
  return (
    <>
      <div className='flex-row'>
        {verticalVariants.map((vertical, index) => (
          <div key={`solid-button-${index}`} className='flex-column'>
            <h4>{title[index]}</h4>
            {horizontalVariants.map((horizontal, idx) => (
              <TextButton
                key={`solid-button-${index}=${idx}`}
                {...vertical}
                size={horizontal.size}
                trailingIcon={
                  horizontal.trailingIcon !== undefined
                    ? {
                        variants: trailingIconVariants,
                        iconName: trailingIconName,
                        src: trailingIconSrc,
                      }
                    : undefined
                }
                leadingIcon={
                  horizontal.leadingIcon
                    ? {
                        variants: leadingIconVariants,
                        iconName: leadingIconName,
                        src: leadingIconSrc,
                      }
                    : undefined
                }
              >
                {children}
              </TextButton>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

type Story = StoryObj<TextButtonExtendIconProps>;
const renderFunction = (args: TextButtonExtendIconProps): ReactElement => {
  const {
    trailingIconVariants,
    trailingIconName,
    trailingIconSrc,
    leadingIconName,
    leadingIconSrc,
    leadingIconVariants,
    ...rest
  } = args;
  return (
    <TextButton
      {...rest}
      trailingIcon={
        trailingIconName || trailingIconSrc
          ? {
              variants: trailingIconVariants,
              iconName: trailingIconName,
              src: trailingIconSrc,
            }
          : undefined
      }
      leadingIcon={
        leadingIconName || leadingIconSrc
          ? {
              variants: leadingIconVariants,
              iconName: leadingIconName,
              src: leadingIconSrc,
            }
          : undefined
      }
    />
  );
};

export const Primary: Story = {
  args: {
    children: '버튼명',
    variants: 'primary',
    disabled: false,
  },
  render: renderFunction,
};
export const Secondary: Story = {
  args: {
    children: '버튼명',
    variants: 'secondary',
    disabled: false,
  },
  render: renderFunction,
};
export const IconButton: Story = {
  args: {
    children: '버튼명',
    variants: 'primary',
    disabled: false,
    trailingIconName: 'check',
    leadingIconName: 'check',
  },
  render: renderFunction,
};
export const Link: Story = {
  args: {
    children: '버튼명',
    variants: 'primary',
    disabled: false,
    target: '_blank',
    href: '#',
  },
  render: renderFunction,
};
