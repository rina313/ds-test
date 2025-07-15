import { type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { avatarMetaData } from './Avatar.meta';
import type { AvatarProps, AvatarSize } from './Avatar.types';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Contents/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: '아바타는 인터페이스에서 개인이나 기업의 썸네일을 보여주는 데 사용됩니다.',
      },
    },
  },
  ...avatarMetaData,
};
export default meta;

const verticalVariants: AvatarSize[] = ['xs', 's', 'm'];

export const AllVariants = ({ variant, ...params }: AvatarProps): ReactElement => {
  return (
    <div className='flex-row' style={{ alignItems: 'center' }}>
      {verticalVariants.map((size) => (
        <Avatar key={`${variant}${size}`} {...params} size={size} variant='circle' />
      ))}
      {verticalVariants.map((size) => (
        <Avatar key={`${variant}${size}`} {...params} size={size} variant='square' />
      ))}
    </div>
  );
};

type Story = StoryObj<typeof Avatar>;
export const Circle: Story = {
  args: {
    variant: 'circle',
  },
};
export const Square: Story = {
  args: {
    variant: 'square',
  },
};
