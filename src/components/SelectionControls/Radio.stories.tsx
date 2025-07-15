import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextButton } from '@/components/Button';

import { Radio as RadioComponent } from './index';
import { checkedEventData } from './Selection.meta';
import type { RadioProps } from './Selection.types';

const meta: Meta<typeof RadioComponent> = {
  title: 'Components/Selection Controls/Radio',
  component: RadioComponent,
  ...checkedEventData,
  parameters: {
    docs: {
      description: {
        component:
          'Radio button은 상호 간에 배타적인 두 개 이상의 옵션이 있어서 그중 하나만을 선택할 수 있을 경우 사용됩니다. \n※디폴트로 하나는 무조건 선택되어 있어야 합니다.',
      },
    },
  },
};
export default meta;

const verticalVariants: Omit<RadioProps, 'checked'>[] = [
  {},
  { label: <p>텍스트 입력</p> },
  { label: <TextButton onClick={() => alert('페이지 이동')}>텍스트 입력</TextButton> },
];

const horizontalVariants: RadioProps[] = [
  { checked: false },
  { checked: true },
  { checked: false, disabled: true },
  { checked: true, disabled: true },
];
export const AllVariants = (): ReactElement => {
  return (
    <div className='flex-row'>
      {verticalVariants.map((vertical, index) => (
        <div className='flex-column' key={`switch-vertical-${index}`}>
          {horizontalVariants.map((horizontal, idx) => (
            <RadioComponent key={`switch-horizontal-${idx}`} {...vertical} {...horizontal} />
          ))}
        </div>
      ))}
    </div>
  );
};

type Story = StoryObj<typeof RadioComponent>;

export const Default: Story = {
  args: {
    ...checkedEventData.args,
  },
  render: (args) => {
    const { checked, disabled, label } = args;
    const [checkedState, setChecked] = useState(checked);

    return (
      <RadioComponent
        checked={checked || checkedState}
        label={label}
        onClick={() => setChecked(!checkedState)}
        disabled={disabled}
      />
    );
  },
};

export const TextButtonLabel: Story = {
  args: {
    ...checkedEventData.args,
    label: <TextButton onClick={() => alert('페이지 이동')}>텍스트 입력</TextButton>,
  },
  render: (args) => {
    const { checked, disabled, label } = args;
    const [checkedState, setChecked] = useState(checked);

    return (
      <RadioComponent
        checked={checked || checkedState}
        label={label}
        onClick={() => setChecked(!checkedState)}
        disabled={disabled}
      />
    );
  },
};
