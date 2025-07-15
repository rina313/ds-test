import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Switch as SwitchComponent } from './index';
import { switchMetaData } from './Selection.meta';
import type { SwitchProps } from './Selection.types';

const meta: Meta<typeof SwitchComponent> = {
  title: 'Components/Selection Controls/Switch',
  component: SwitchComponent,
  ...switchMetaData,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle-switch는 상호간에 배타적인 옵션이 있어 각 선택에 따른 효과 전환이 필요할 경우 사용합니다.',
      },
    },
  },
};
export default meta;

const verticalVariants: SwitchProps[] = [
  { on: false },
  { on: true },
  { on: false, disabled: true },
  { on: true, disabled: true },
];

const horizontalVariants: Omit<SwitchProps, 'on'>[] = [{ size: 's' }, { size: 'm' }];
export const AllVariants = (): ReactElement => {
  return (
    <div className='flex-row'>
      {verticalVariants.map((vertical, index) => (
        <div className='flex-column' key={`switch-vertical-${index}`}>
          {horizontalVariants.map((horizontal, idx) => (
            <SwitchComponent key={`switch-horizontal-${idx}`} {...vertical} {...horizontal} />
          ))}
        </div>
      ))}
    </div>
  );
};

type Story = StoryObj<typeof SwitchComponent>;

export const Default: Story = {
  args: {
    ...switchMetaData.args,
  },
  render: (args) => {
    const { on, disabled, size } = args;
    const [checkedState, setChecked] = useState(on);

    return (
      <SwitchComponent
        on={on || checkedState}
        size={size}
        onClick={() => setChecked(!checkedState)}
        disabled={disabled}
      />
    );
  },
};
export const Label: Story = {
  args: {
    ...switchMetaData.args,
  },
  render: (args) => {
    const { on, disabled, size } = args;
    const [checkedState, setChecked] = useState(on);

    return (
      <div style={{ maxWidth: 400 }}>
        <SwitchComponent
          on={on || checkedState}
          size={size}
          onClick={() => setChecked(!checkedState)}
          disabled={disabled}
          label={<p>가격 변동 알림설정</p>}
        />
        <br />
        <SwitchComponent
          on={on || checkedState}
          size={size}
          onClick={() => setChecked(!checkedState)}
          disabled={disabled}
          label={<p>키워드 순위 변동 알림설정</p>}
        />
      </div>
    );
  },
};
