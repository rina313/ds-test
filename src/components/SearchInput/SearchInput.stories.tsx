import { useState, type ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput as SearchInputComponent } from './index';
import { searchInputMetaData } from './SearchInput.meta';
import type { SearchInputProps, SearchInputSize } from './SearchInput.types';
import type { ExtendIconProps } from '../Icon/Icon.types';

type SearchInputExtendedIconProps = ExtendIconProps<SearchInputProps, 'trailingContent'>;

const meta: Meta<typeof SearchInputComponent> = {
  title: 'Components/Form/Search Input',
  component: SearchInputComponent,
  parameters: {
    docs: {
      description: {
        component: '콘텐츠를 검색할 때 사용합니다. ',
      },
    },
  },
  ...searchInputMetaData,
};
export default meta;
const verticalVariants: SearchInputSize[] = ['s', 'm', 'l'];

export const AllVariants = ({
  trailingContentVariants,
  trailingContentName,
  trailingContentSrc,
  ...args
}: SearchInputExtendedIconProps): ReactElement => {
  const [input, setInput] = useState<string>('');

  return (
    <div className='flex-row' style={{ gap: 20 }}>
      <div className='flex-column' style={{ width: 370 }}>
        {verticalVariants.map((size, index) => (
          <div style={{ width: '100%' }} key={`textField-size-${size}-${index}`}>
            <SearchInputComponent
              name='text-field-input'
              {...args}
              size={size}
              value={input || args.value}
              onChange={(val) => setInput(val)}
              trailingContent={{
                iconName: trailingContentName,
                src: trailingContentSrc,
                variants: trailingContentVariants,
              }}
            />
          </div>
        ))}
      </div>
      <div className='flex-column' style={{ width: 370 }}>
        {verticalVariants.map((size, index) => (
          <div style={{ width: '100%' }} key={`textField-size-${size}-${index}-disabled`}>
            <SearchInputComponent
              name='text-field-input'
              {...args}
              size={size}
              value={input || args.value}
              onChange={(val) => setInput(val)}
              disabled
              trailingContent={{
                iconName: trailingContentName,
                src: trailingContentSrc,
                variants: trailingContentVariants,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
type Story = StoryObj<SearchInputExtendedIconProps>;

export const Default: Story = {
  args: {
    ...searchInputMetaData.args,
    value: '',
    placeholder: '검색어를 입력하세요',
    size: 'l',
  },
  render: (args) => {
    const [input, setInput] = useState<string>((args.value as string) || '');

    return (
      <SearchInputComponent
        {...args}
        value={input}
        onChange={(val) => {
          setInput(val);
          args.onChange?.(val);
        }}
        trailingContent={{
          iconName: args.trailingContentName,
          src: args.trailingContentSrc,
          variants: args.trailingContentVariants,
        }}
      />
    );
  },
};
