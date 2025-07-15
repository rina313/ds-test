import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Tab as SegmentControlCompoenet } from './index';
import { tabMetaData } from './Tab.meta';
import type { TabProps } from './Tab.types';

const meta: Meta<typeof SegmentControlCompoenet> = {
  title: 'Components/Tab/Tab',
  component: SegmentControlCompoenet,
  parameters: {
    docs: {
      description: {
        component:
          '탭(Tabs)은 페이지 내 유사한 콘텐츠를 그룹화하여 섹션 간 이동 시 사용합니다. 해당 페이지를 벗어나지 않고 섹션 별 콘텐츠 둘러보기 가능합니다.',
      },
    },
  },
  ...tabMetaData,
};
export default meta;

export const AllVariants = (params: TabProps): ReactElement => {
  const { options } = params;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <div className='flex-row'>
      <div className='flex-column' style={{ maxWidth: 800 }}>
        <SegmentControlCompoenet
          options={options}
          selectedIdx={selectedIdx}
          onClick={(idx: number) => setSelectedIdx(idx)}
          vertical
          horizontal
        />
        <SegmentControlCompoenet
          options={options}
          selectedIdx={selectedIdx}
          onClick={(idx: number) => setSelectedIdx(idx)}
        />
      </div>
      <div className='flex-column' style={{ maxWidth: 800 }}>
        <SegmentControlCompoenet
          options={options}
          selectedIdx={selectedIdx}
          onClick={(idx: number) => setSelectedIdx(idx)}
          size='m'
          vertical
          horizontal
        />
        <SegmentControlCompoenet
          options={options}
          selectedIdx={selectedIdx}
          onClick={(idx: number) => setSelectedIdx(idx)}
          size='m'
        />
      </div>
    </div>
  );
};
type Story = StoryObj<typeof SegmentControlCompoenet>;

export const Tab: Story = {
  args: {
    ...tabMetaData.args,
    selectedIdx: 0,
  },
  render: (args) => {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    return (
      <SegmentControlCompoenet
        {...args}
        selectedIdx={selectedIdx}
        onClick={(idx) => setSelectedIdx(idx)} // 상태 반영
      />
    );
  },
};
