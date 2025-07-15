import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';
import { chipDefaultMetaData } from './Chip.meta';
import type { ChipProps } from './Chip.types';
import type { ExtendIconProps } from '../Icon/Icon.types';

type ChipExtendIconProps = ExtendIconProps<ChipProps, 'leadingIcon' | 'trailingIcon'>;

const meta: Meta<ChipExtendIconProps> = {
  title: 'Components/Chip/Single',
  component: Chip,
  ...chipDefaultMetaData,
};

export default meta;

const verticalVariants: ChipExtendIconProps[] = [
  { variants: 'primary', active: false, trailingIconName: 'close' },
  { variants: 'primary', active: true, trailingIconName: 'close' },
  { variants: 'primary', active: true, disabled: true, trailingIconName: 'close' },
  { variants: 'secondary', active: false, trailingIconName: 'caret-down' },
  { variants: 'secondary', active: true, trailingIconName: 'caret-down' },
  { variants: 'secondary', active: true, disabled: true, trailingIconName: 'caret-down' },
  { variants: 'primary', active: false },
  { variants: 'primary', active: true },
  { variants: 'primary', active: true, disabled: true },
  { variants: 'secondary', active: false },
  { variants: 'secondary', active: true },
  { variants: 'secondary', active: true, disabled: true },
  { variants: 'primary', active: false, leadingIconName: 'check' },
  { variants: 'secondary', active: false, leadingIconName: 'check' },
];
const horizontalVariants: ChipProps[] = [{ size: 'm' }, { size: 's' }, { size: 'xs' }];
export const AllVariants = (params: ChipExtendIconProps): ReactElement => {
  const {
    label,
    trailingIconVariants,
    trailingIconName,
    trailingIconSrc,
    leadingIconName,
    leadingIconSrc,
    leadingIconVariants,
  } = params;
  return (
    <div className='flex-row'>
      {verticalVariants.map((vertical, index) => (
        <div key={`solid-button-${index}`} className='flex-column'>
          {horizontalVariants.map((horizontal, idx) => (
            <Chip
              key={`solid-button-${index}=${idx}`}
              label={label}
              {...horizontal}
              {...vertical}
              trailingIcon={
                vertical.trailingIconName && {
                  variants: trailingIconVariants,
                  iconName: trailingIconName || vertical.trailingIconName,
                  src: trailingIconSrc,
                }
              }
              leadingIcon={
                vertical.leadingIconName && {
                  variants: leadingIconVariants,
                  iconName: leadingIconName || vertical.leadingIconName,
                  src: leadingIconSrc,
                }
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

type Story = StoryObj<ChipExtendIconProps>;
const renderFunction = (args: ChipExtendIconProps): ReactElement => {
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
    <Chip
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
    label: '버튼명',
  },
  render: renderFunction,
};

export const LeadingIconButton: Story = {
  args: {
    leadingIconName: 'check',
    leadingClick: () => {
      console.log('leadingClick');
    },
  },
  render: renderFunction,
};
export const TrailingIconButton: Story = {
  args: {
    trailingIconName: 'close',
    trailingClick: () => {
      console.log('trailingClick');
    },
  },
  render: renderFunction,
};

export const Disabled: Story = {
  args: {
    label: '버튼명',
    disabled: true,
    onClick: () => {
      console.log('onClick');
    },
    trailingIconName: 'close',
    trailingClick: () => {
      console.log('trailingClick');
    },
    leadingIconName: 'download',
    leadingClick: () => {
      console.log('leadingClick');
    },
  },
  render: renderFunction,
};
