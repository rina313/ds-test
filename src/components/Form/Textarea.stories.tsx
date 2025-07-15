import { useState, type ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import { textareaMetaData } from './Form.meta';
import type { ExtendTooltipProps, TextareaProps } from './Form.types';
import { Textarea as TextareaComponent } from './index';

type TextareaExtendTooltipProps = TextareaProps & ExtendTooltipProps;

const meta: Meta<typeof TextareaComponent> = {
  title: 'Components/Form/Textarea',
  component: TextareaComponent,
  parameters: {
    docs: {
      description: {
        component: '비교적 짧은 텍스트를 입력할 때 사용합니다.',
      },
    },
  },
  ...textareaMetaData,
};
export default meta;

export const Textarea = (args: TextareaExtendTooltipProps): ReactElement => {
  const { tooltipLabel, tooltipSize, tooltipVariants, tooltipArrow, tooltipPlacement } = args;
  const [input, setInput] = useState<string>('');
  return (
    <div className='flex-row' style={{ width: 400 }}>
      <TextareaComponent
        name='textarea'
        {...args}
        value={input || args.value}
        onChange={(val) => setInput(val)}
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
