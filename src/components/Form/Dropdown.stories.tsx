import { type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { dropdownMetaData } from './Form.meta';
import type { DropdownProps, ExtendTooltipProps, FormSize } from './Form.types';
import { Dropdown as DropdownComponent } from './index';

type DropdownExtendTooltipProps = DropdownProps & ExtendTooltipProps;

const meta: Meta<typeof DropdownComponent> = {
  title: 'Components/Form/Dropdown',
  component: DropdownComponent,
  parameters: {
    docs: {
      description: {
        component:
          '드롭다운(Dropdowns)은 사용자가 옵션 리스트 중 하나의 옵션 선택 시 활용되는 컴포넌트입니다. 선택 가능한 옵션 개수가 다수일 경우, 드롭다운 메뉴를 사용해 값을 노출합니다.',
      },
    },
  },
  ...dropdownMetaData,
};
export default meta;

const verticalVariants = [
  { title: 'Default' },
  { title: 'Disabled', disabled: true },
  { title: 'Negative', negative: true },
];
const sizeVariants: FormSize[] = ['s', 'm', 'l'];

const RenderDropdown = ({ multiSelect, ...props }: DropdownExtendTooltipProps): ReactElement => {
  const { tooltipLabel, tooltipSize, tooltipVariants, tooltipArrow, tooltipPlacement } = props;
  return (
    <div className={'flex-column'} style={{ width: 270 }}>
      <DropdownComponent
        {...props}
        multiSelect={multiSelect}
        tooltipProps={{
          label: tooltipLabel,
          size: tooltipSize,
          variants: tooltipVariants,
          arrow: tooltipArrow,
          placement: tooltipPlacement,
          children: '',
        }}
      />
    </div>
  );
};

export const AllVariants = ({ ...args }: DropdownProps): ReactElement => {
  return (
    <div className='flex-row' style={{ gap: 20 }}>
      <h4 style={{ textAlign: 'center', width: '100%', marginBottom: 20 }}>Single Select</h4>
      {verticalVariants.map((vertical, index) => (
        <div key={`dropdown-component-${index}`} className={'flex-column'}>
          <p>{vertical.title}</p>
          {sizeVariants.map((size, idx) => (
            <RenderDropdown
              key={`dropdown-component-${index}-${idx}`}
              {...args}
              {...vertical}
              size={size}
            />
          ))}
        </div>
      ))}
      <div className='flex-row' style={{ gap: 20 }}>
        <h4 style={{ textAlign: 'center', width: '100%', marginTop: 20 }}>Multi Select</h4>
        {verticalVariants
          .filter((v) => !v.negative)
          .map((vertical, index) => (
            <div key={`dropdown-component-multi-${index}`} className={'flex-column'}>
              {sizeVariants.map((size, idx) => (
                <RenderDropdown
                  key={`dropdown-component-multi-${index}-${idx}`}
                  {...args}
                  {...vertical}
                  size={size}
                  multiSelect
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

type Story = StoryObj<typeof DropdownComponent>;

export const Default: Story = {
  render: RenderDropdown,
  args: {
    menus: [
      { label: 'Option 1', id: 'option1' },
      { label: 'Option 2', id: 'option2' },
      { label: 'Option 3', id: 'option3' },
    ],
  },
};

export const Disabled: Story = {
  render: RenderDropdown,
  args: {
    menus: [
      { label: 'Option 1', id: 'option1' },
      { label: 'Option 2', id: 'option2' },
      { label: 'Option 3', id: 'option3' },
    ],
    disabled: true,
  },
};

export const Negative: Story = {
  render: RenderDropdown,
  args: {
    menus: [
      { label: 'Option 1', id: 'option1' },
      { label: 'Option 2', id: 'option2' },
      { label: 'Option 3', id: 'option3' },
    ],
    negative: true,
  },
};

export const DefaultMulti: Story = {
  render: RenderDropdown,
  args: {
    multiSelect: true,
  },
};
