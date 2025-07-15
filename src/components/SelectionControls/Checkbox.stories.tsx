import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextButton } from '@/components/Button';

import { Checkbox as CheckboxComponent } from './index';
import { checkedEventData } from './Selection.meta';
import type { CheckboxProps } from './Selection.types';

const meta: Meta<typeof CheckboxComponent> = {
  title: 'Components/Selection Controls/Checkbox',
  component: CheckboxComponent,
  ...checkedEventData,
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox는 한 개 또는 다수의 독립적인 옵션들이 있어서 사용자의 의사에 따라 선택하지 않을 수 있고, 하나 또는 여러 개를 선택할 수 있을 때 사용됩니다. Checkbox가 한 개인 경우 기능을 on/off 하는 용도로 사용할 수 있습니다.',
      },
    },
  },
};
export default meta;

const verticalVariants: Omit<CheckboxProps, 'checked'>[] = [
  {},
  { label: <p>텍스트 입력</p> },
  { label: <TextButton onClick={() => alert('페이지 이동')}>텍스트 입력</TextButton> },
];

const horizontalVariants: CheckboxProps[] = [
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
            <CheckboxComponent key={`switch-horizontal-${idx}`} {...vertical} {...horizontal} />
          ))}
        </div>
      ))}
    </div>
  );
};

type Story = StoryObj<typeof CheckboxComponent>;

export const Default: Story = {
  args: {
    ...checkedEventData.args,
  },
  render: (args) => {
    const { checked, disabled, label } = args;
    const [checkedState, setChecked] = useState(checked);

    return (
      <CheckboxComponent
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
      <CheckboxComponent
        checked={checked || checkedState}
        label={label}
        onClick={() => setChecked(!checkedState)}
        disabled={disabled}
      />
    );
  },
};
