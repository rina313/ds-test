import type { Meta } from '@storybook/react/*';

import type { SliderProps } from './Slider.types';

export const sliderMetaData: Meta<SliderProps> = {
  argTypes: {
    min: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    max: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    minValue: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    maxValue: {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    isSingle: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    onChangeRange: {
      table: {
        disable: true,
      },
    },
    labelText: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    showValue: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    unitText: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    minValue: 0,
    maxValue: 50,
    isSingle: false,
    labelText: 'Label',
    showValue: true,
    unitText: '',
    disabled: false,
  },
};
