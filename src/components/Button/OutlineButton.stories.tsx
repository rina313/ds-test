import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { solidOutlineMetaData } from './Button.meta';
import type { OutlineButtonProps } from './Button.types';
import { OutlineButton } from './index';
import type { ExtendIconProps } from '../Icon/Icon.types';

type OutlineButtonExtendIconProps = ExtendIconProps<
  OutlineButtonProps,
  'leadingIcon' | 'trailingIcon'
>;

const meta: Meta<OutlineButtonExtendIconProps> = {
  title: 'Components/Buttons/OutlineButton',
  component: OutlineButton,
  ...solidOutlineMetaData,
};
export default meta;

const verticalVariants: OutlineButtonProps[] = [
  { variants: 'primary', disabled: false },
  { variants: 'secondary', disabled: false },
  { disabled: true },
];
const horizontalVariants: OutlineButtonProps[] = [
  { size: 'l' },
  { size: 'm' },
  { size: 's' },
  { size: 'm', trailingIcon: {} },
  { size: 'm', leadingIcon: {} },
  { size: 'm', trailingIcon: {}, leadingIcon: {} },
  { size: 'l', iconOnly: true, leadingIcon: {} },
  { size: 'm', iconOnly: true, leadingIcon: {} },
  { size: 's', iconOnly: true, leadingIcon: {} },
];
export const AllVariants = (params: OutlineButtonExtendIconProps): ReactElement => {
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
            <h4>{vertical.disabled ? 'disabled' : vertical.variants}</h4>
            {horizontalVariants.map((horizontal, idx) => (
              <OutlineButton
                key={`solid-button-${index}=${idx}`}
                {...vertical}
                {...horizontal}
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
                  horizontal.iconOnly || horizontal.leadingIcon
                    ? {
                        variants: leadingIconVariants,
                        iconName: leadingIconName,
                        src: leadingIconSrc,
                      }
                    : undefined
                }
              >
                {children}
              </OutlineButton>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

type Story = StoryObj<OutlineButtonExtendIconProps>;
const renderFunction = (args: OutlineButtonExtendIconProps): ReactElement => {
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
    <OutlineButton
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
    size: 'm',
    disabled: false,
    iconOnly: false,
  },
  render: renderFunction,
};
export const Secondary: Story = {
  args: {
    children: '버튼명',
    variants: 'secondary',
    size: 'm',
    disabled: false,
    iconOnly: false,
  },
  render: renderFunction,
};
export const IconButton: Story = {
  args: {
    children: '버튼명',
    variants: 'primary',
    size: 'm',
    disabled: false,
    iconOnly: false,
    trailingIconName: 'check',
    leadingIconName: 'check',
  },
  render: renderFunction,
};
export const IconOnly: Story = {
  args: {
    children: '버튼명',
    variants: 'primary',
    size: 'l',
    disabled: false,
    iconOnly: true,
    trailingIconName: 'user',
  },
  render: renderFunction,
};
