import { type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './index';
import { sliderMetaData } from './Slider.meta';
import type { SliderProps } from './Slider.types';

const meta: Meta<typeof Slider> = {
  title: 'Components/Menu/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: '범위 내의 현재 값과 간격을 표시하기 위한 구성 요소입니다. ',
      },
    },
  },
  ...sliderMetaData,
};
export default meta;

export const AllVariants = ({ ...params }: SliderProps): ReactElement => {
  return (
    <div className='flex-row' style={{ width: 400 }}>
      <Slider {...params} />
    </div>
  );
};

type Story = StoryObj<typeof Slider>;
export const Single: Story = {
  args: {
    isSingle: true,
  },
};
export const Dual: Story = {
  args: {
    isSingle: false,
  },
};
