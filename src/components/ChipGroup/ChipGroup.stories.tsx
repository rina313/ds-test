import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { normalizeOptions } from '@/utils';

import ChipGroup from './ChipGroup';
import { chipGroupDefaultMetaData } from './ChipGroup.meta';
import type { ChipGroupProps } from './ChipGroup.types';
import type { ChipProps } from '../Chip/Chip.types';
import type { ExtendIconProps } from '../Icon/Icon.types';

type ChipGroupExtendIconProps = ExtendIconProps<ChipGroupProps, 'trailingButtonIcon'>;

const meta: Meta<ChipGroupExtendIconProps> = {
  title: 'Components/Chip/Group',
  component: ChipGroup,
  ...chipGroupDefaultMetaData,
};

export default meta;

const createChips = (length = 4, commonTypes?: ChipProps) => {
  const chips = new Array(length).fill(null).map((_, idx) => ({
    label: '버튼명',
    active: idx === 0,
    ...commonTypes,
  }));
  return normalizeOptions(chips) as (ChipProps & { id: string })[];
};
const verticalVariants: ChipGroupExtendIconProps[] = [
  {
    variants: 'primary',
    chips: createChips(20),
  },
  {
    variants: 'secondary',
    chips: createChips(20),
  },
  {
    variants: 'primary',
    chips: createChips(20),
    multiple: true,
  },
  {
    variants: 'secondary',
    chips: createChips(20),
    multiple: true,
  },
  {
    variants: 'primary',
    chips: createChips(20),
    gradientLeading: true,
  },
  {
    variants: 'secondary',
    chips: createChips(20),
    gradientTrailing: true,
  },
  {
    variants: 'primary',
    chips: createChips(20),
    multiple: true,
    gradientLeading: true,
    gradientTrailing: true,
    trailingButtonIconName: 'expand',
  },
  {
    variants: 'secondary',
    chips: createChips(20),
    multiple: true,
    gradientLeading: true,
    gradientTrailing: true,
    trailingButtonIconName: 'expand',
  },
];
export const AllVariants = (): ReactElement => {
  return (
    <div className='div-row-list'>
      {verticalVariants.map((vertical, index) => (
        <div key={`solid-button-${index}`}>
          <ChipGroup {...vertical} />
        </div>
      ))}
    </div>
  );
};

type Story = StoryObj<ChipGroupExtendIconProps>;
const renderFunction = (args: ChipGroupExtendIconProps): ReactElement => {
  const { trailingButtonIconVariants, trailingButtonIconName, trailingButtonIconSrc, ...rest } =
    args;
  return (
    <ChipGroup
      {...rest}
      trailingButtonIcon={{
        variants: trailingButtonIconVariants,
        iconName: trailingButtonIconName,
        src: trailingButtonIconSrc,
      }}
    />
  );
};

export const Primary: Story = {
  args: {
    variants: 'primary',
    chips: createChips(20),
  },
  render: renderFunction,
};

export const Secondary: Story = {
  args: {
    variants: 'secondary',
    chips: createChips(20),
  },
  render: renderFunction,
};

export const PrimaryMulti: Story = {
  args: {
    variants: 'primary',
    multiple: true,
    chips: createChips(20),
    gradientLeading: true,
  },
  render: renderFunction,
};

export const SecondaryMulti: Story = {
  args: {
    variants: 'secondary',
    multiple: true,
    chips: createChips(20),
    gradientTrailing: true,
  },
  render: renderFunction,
};

export const TrailingButton: Story = {
  args: {
    variants: 'primary',
    multiple: true,
    chips: createChips(20),
    gradientTrailing: true,
    trailingButtonIconName: 'expand',
    trailingButtonClick: () => {
      console.log('use filter');
    },
  },
  render: renderFunction,
};
/** trailing event와 chip event를 구분해서 실행 (개발자도구에서 console.log 확인 가능) */
export const UseChipTrailingEvent: Story = {
  args: {
    variants: 'primary',
    multiple: true,
    chips: createChips(20, {
      trailingIcon: { iconName: 'close' },
      onClick: () => {
        console.log('chip event');
      },
      trailingClick: () => {
        console.log('chip tail event');
      },
    }),
  },
  render: renderFunction,
};
/**
 * 외부에서 selected 데이터를 제어 및
 * renderChips를 사용해 Chip이 선택될 때 props값 변경
 */
export const controlSelectedData = (): ReactElement => {
  const data = createChips(50);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const renderChips = (selected: boolean, chip: ChipProps): ChipProps => {
    if (!selected) return chip;
    return {
      ...chip,
      leadingIcon: { iconName: 'check' },
    };
  };
  return (
    <div className='div-row-list'>
      <ChipGroup
        chips={data}
        selectedChipIds={selectedChips}
        onSelectionChange={setSelectedChips}
        multiple
        renderChips={renderChips}
      />
    </div>
  );
};

const disabledChips = createChips(5, {
  trailingIcon: { iconName: 'close' },
});
/** 선택 기능 비활성화 */
export const DisabledSelected: Story = {
  args: {
    variants: 'primary',
    multiple: true,
    chips: disabledChips,
    selectable: false,
  },
  render: renderFunction,
};
/** 선택 기능 비활성화시 활성화된 chips 존재 */
export const DisabledDefaultSelected: Story = {
  args: {
    variants: 'primary',
    multiple: true,
    chips: disabledChips,
    selectedChipIds: [disabledChips[0].id, disabledChips[3].id],
    selectable: false,
  },
  render: renderFunction,
};
