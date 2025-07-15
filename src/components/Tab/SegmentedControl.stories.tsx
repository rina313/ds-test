import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SegmentedControl as SegmentedControlCompoenet } from './index';
import { segmentedControlMetaData } from './Tab.meta';
import type { SegmentedControlProps } from './Tab.types';

const meta: Meta<typeof SegmentedControlCompoenet> = {
  title: 'Components/Tab/Segmented Control',
  component: SegmentedControlCompoenet,
  parameters: {
    docs: {
      description: {
        component:
          '탭(Tabs)은 페이지 내 유사한 콘텐츠를 그룹화하여 섹션 간 이동 시 사용합니다. 해당 페이지를 벗어나지 않고 섹션 별 콘텐츠 둘러보기 가능합니다.',
      },
    },
  },
  ...segmentedControlMetaData,
};
export default meta;

export const AllVariants = (params: SegmentedControlProps): ReactElement => {
  const { options } = params;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <div className='flex-column' style={{ alignItems: 'flex-start' }}>
      <SegmentedControlCompoenet
        options={options}
        selectedIdx={selectedIdx}
        onClick={(idx: number) => setSelectedIdx(idx)}
      />
      <SegmentedControlCompoenet
        options={options}
        selectedIdx={selectedIdx}
        onClick={(idx: number) => setSelectedIdx(idx)}
        size='m'
      />
      <SegmentedControlCompoenet
        maxWidth='815px'
        options={[
          ...(options as string[]),
          ...(options as string[]),
          ...(options as string[]),
          ...(options as string[]),
        ]}
        selectedIdx={selectedIdx}
        onClick={(idx: number) => setSelectedIdx(idx)}
        size='m'
      />
    </div>
  );
};
type Story = StoryObj<typeof SegmentedControlCompoenet>;

export const SegmentedControl: Story = {
  args: {
    ...segmentedControlMetaData.args,
    selectedIdx: 0,
  },
  render: (args) => {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    return (
      <SegmentedControlCompoenet
        {...args}
        selectedIdx={selectedIdx}
        onClick={(idx) => setSelectedIdx(idx)} // 상태 반영
      />
    );
  },
};
