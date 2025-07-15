import type { ReactElement } from 'react';

import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';
import IconDocs from './Icon.docs.mdx';
import { iconDefaultMetaData } from './Icon.meta';
import type { IconProps } from './Icon.types';

const meta: Meta<typeof Icon> = {
  title: 'Foundation/Icon',
  component: Icon,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
          <IconDocs />
        </>
      ),
    },
  },
  ...iconDefaultMetaData,
};

export default meta;

const sizes = ['xs', 's', 'm', 'l', 'xl'] as const;
const variants = ['fa-regular', 'fa-solid'] as const;

export const AllVariants = (params: IconProps): ReactElement => {
  const { iconName, src, alt } = params;
  return (
    <div className='flex-column' style={{ alignItems: 'flex-start', gap: '1rem' }}>
      {variants.map((variant) => (
        <div key={`icon-variant-${variant}`} className='flex-row' style={{ alignItems: 'center' }}>
          <span className='text-center' style={{ width: '100px' }}>
            {variant}
          </span>
          {sizes.map((size) => (
            <Icon
              key={`icon-size-${size}`}
              {...params}
              variants={variant}
              size={size}
              iconName={iconName}
              src={src}
              alt={alt}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const FontAwesome: StoryObj = {
  args: {
    size: 'xl',
  },
};

export const ImageIcon: StoryObj = {
  args: {
    variants: 'image',
    src: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1644169460/noticon/frvhykszxhjz4asz77oi.png',
    size: 'xl',
  },
};
