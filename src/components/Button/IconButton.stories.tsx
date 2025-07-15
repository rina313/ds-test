import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { iconButtonMetaData } from './Button.meta';
import type { IconButtonProps } from './Button.types';
import { IconButton } from './index';
import type { ExtendIconProps } from '../Icon/Icon.types';

type IconButtonStoryProps = ExtendIconProps<IconButtonProps, 'icon'>;

const meta: Meta<IconButtonStoryProps> = {
  title: 'Components/Buttons/IconButton',
  component: IconButton,
  ...iconButtonMetaData,
};
export default meta;

const verticalVariants: IconButtonProps[] = [
  { variants: 'primary', disabled: false },
  { variants: 'secondary', disabled: false },
  { disabled: true },
];
const horizontalVariants: IconButtonProps[] = [
  { size: 'xl' },
  { size: 'l' },
  { size: 'm' },
  { size: 's' },
];
export const AllVariants = (params: IconButtonStoryProps): ReactElement => {
  const { badge = false, icon, iconVariants, iconName, iconSrc } = params;
  return (
    <>
      <div className='flex-row'>
        {verticalVariants.map((horizontal, index) => (
          <div key={`solid-button-${index}`} className='flex-column'>
            <h4>{horizontal.disabled ? 'disabled' : horizontal.variants}</h4>
            {horizontalVariants.map((vertical, idx) => (
              <IconButton
                {...horizontal}
                {...vertical}
                key={`solid-button-${index}=${idx}`}
                badge={badge}
                icon={{ ...icon, variants: iconVariants, iconName, src: iconSrc }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

type Story = StoryObj<IconButtonStoryProps>;
export const Primary: Story = {
  args: {
    variants: 'primary',
    size: 'm',
    disabled: false,
    badge: true,
  },
  render: (args) => {
    const { iconName, icon, ...rest } = args;
    return <IconButton {...rest} icon={{ ...icon, iconName }} />;
  },
};
export const Secondary: Story = {
  args: {
    variants: 'secondary',
    size: 'm',
    disabled: false,
    badge: true,
  },
  render: (args) => {
    const { iconName, icon, ...rest } = args;
    return <IconButton {...rest} icon={{ ...icon, iconName }} />;
  },
};
export const Disabled: Story = {
  args: {
    variants: 'primary',
    size: 'm',
    disabled: true,
  },
  render: (args) => {
    const { iconName, icon, ...rest } = args;
    return <IconButton {...rest} icon={{ ...icon, iconName }} />;
  },
};
