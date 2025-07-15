import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';
import { TagDefaultMetaData } from './Tag.meta';
import type { TagProps } from './Tag.types';

const meta: Meta<typeof Tag> = {
  title: 'Components/Feedback/Tag',
  component: Tag,
  ...TagDefaultMetaData,
};

export default meta;

export const AllVariants = (params: TagProps): ReactElement => {
  const { iconName = 'expand', label = '태그' } = params;
  return (
    <div className='flex-column'>
      <div className='flex-row'>
        <Tag variants='solid' label={label} />
        <Tag variants='solid' iconName={iconName} label={label} />
        <Tag variants='solid' iconName={iconName} />
        <Tag variants='outline' label={label} />
        <Tag variants='outline' iconName={iconName} label={label} />
        <Tag variants='outline' iconName={iconName} />
      </div>
      <div className='flex-row'>
        <Tag size='s' variants='solid' label={label} />
        <Tag size='s' variants='solid' iconName={iconName} label={label} />
        <Tag size='s' variants='solid' iconName={iconName} />
        <Tag size='s' variants='outline' label={label} />
        <Tag size='s' variants='outline' iconName={iconName} label={label} />
        <Tag size='s' variants='outline' iconName={iconName} />
      </div>
    </div>
  );
};

export const Solid: StoryObj = {
  args: {
    label: '태그',
  },
};

export const Outline: StoryObj = {
  args: {
    variants: 'outline',
    label: '태그',
  },
};

export const Icon: StoryObj = {
  args: {
    iconName: 'expand',
  },
};
