import { useState, type ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import type { ExtendIconProps } from '@/components/Icon/Icon.types';

import { textFieldMetaData } from './Form.meta';
import type { ExtendTooltipProps, FormSize, TextfieldProps } from './Form.types';
import { Textfield as TextfiledComponent } from './index';

type TextfieldExtendIconProps = ExtendIconProps<TextfieldProps, 'leadingIcon'>;
type TextfieldExtendTooltipProps = TextfieldExtendIconProps & ExtendTooltipProps;

const meta: Meta<TextfieldExtendIconProps> = {
  title: 'Components/Form/Textfield',
  component: TextfiledComponent,
  parameters: {
    docs: {
      description: {
        component: '비교적 짧은 텍스트를 입력할 때 사용합니다.',
      },
    },
  },
  ...textFieldMetaData,
};
export default meta;
const verticalVariants: FormSize[] = ['s', 'm', 'l'];

export const AllVariants = ({
  leadingIconName,
  leadingIconVariants,
  leadingIconSrc,
  tooltipLabel,
  tooltipSize,
  tooltipVariants,
  tooltipArrow,
  tooltipPlacement,
  ...args
}: TextfieldExtendTooltipProps): ReactElement => {
  const [input, setInput] = useState<string>('');

  return (
    <div className='flex-row'>
      {verticalVariants.map((size, index) => (
        <div key={`textField-size-${size}-${index}`} style={{ width: 300 }}>
          <TextfiledComponent
            name='text-field-input'
            {...args}
            size={size}
            value={input || args.value}
            onChange={(val) => setInput(val)}
            leadingIcon={{
              iconName: leadingIconName,
              variants: leadingIconVariants,
              src: leadingIconSrc,
            }}
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
      ))}
    </div>
  );
};
