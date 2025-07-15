import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { IconButton, SolidButton } from '@/components/Button';

import Badge from './Badge';
import { badgeDefaultMetaData } from './Badge.meta';
import type { BadgeProps } from './Badge.types';

const meta: Meta<typeof Badge> = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  ...badgeDefaultMetaData,
};

export default meta;

const verticalProps: BadgeProps[] = [
  {
    size: 's',
    variants: 'dot',
  },
  {
    size: 'm',
    variants: 'dot',
  },
  {
    size: 's',
    variants: 'number',
    count: 2,
  },
  {
    size: 'm',
    variants: 'number',
    count: 500,
  },
];

export const AllVariants = (params: BadgeProps): ReactElement => {
  const { count, show = true, border = true } = params;
  return (
    <div className='flex-column'>
      <div className='flex-row'>
        {verticalProps.map((vertical, idx) => (
          <Badge
            key={`badge_${idx}`}
            {...vertical}
            show={show}
            border={border}
            {...(count && { count: count ?? vertical.count })}
          />
        ))}
      </div>
      <div className='flex-row'>
        <Badge size='m' count={count ?? 100} show={show} border={border}>
          <SolidButton variants='secondary'>Message</SolidButton>
        </Badge>
        <Badge size='m' count={count ?? 100} show={show} border={border}>
          <IconButton variants='secondary' size='xl' icon={{ iconName: 'message' }}>
            알림
          </IconButton>
        </Badge>
        <Badge size='s' count={count ?? 100} show={show} border={border}>
          <IconButton variants='secondary' size='l' icon={{ iconName: 'message' }}>
            알림
          </IconButton>
        </Badge>
      </div>
    </div>
  );
};

export const Number: StoryObj = {
  args: {
    variants: 'number',
    count: 10,
  },
};

export const Dot: StoryObj = {
  args: {
    variants: 'dot',
  },
};
