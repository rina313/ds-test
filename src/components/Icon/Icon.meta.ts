import type { Meta } from '@storybook/react/*';

import type { IconProps } from './Icon.types';

export const iconNames = ['bell', 'calendar', 'check-circle', 'file'] as const;

export const iconDefaultMetaData: Meta<IconProps> = {
  args: {
    variants: 'fa-solid',
    size: 'm',
    iconName: 'calendar',
    src: '',
    alt: 'Icon',
    className: '',
  },
  argTypes: {
    variants: {
      control: {
        type: 'select',
        options: ['fa-regular', 'fa-solid', 'image', 'brand'],
      },
      table: {
        type: {
          summary: 'fa-regular | fa-solid | image | brand',
        },
      },
      description: '아이콘의 스타일 타입을 선택합니다.',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 's', 'm', 'l', 'xl'],
      },
      table: {
        type: {
          summary: 'xs | s | m | l | xl',
        },
      },
    },
    iconName: {
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      description:
        'fontAwesome에서 제공하는 아이콘 이름만 사용 가능합니다.' +
        `<br />"${iconNames.join('", "')}" 등 <br /> [FontAwesome 참고](https://fontawesome.com/search?ic=free)`,
    },
    src: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      if: {
        arg: 'variants',
        eq: 'image',
      },
      description: '아이콘의 이미지 URL을 입력합니다.',
    },
    alt: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      description: '이미지 아이콘의 대체 텍스트를 입력합니다.',
    },
    className: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      description: '아이콘에 추가할 CSS 클래스를 입력합니다.',
    },
  },
};

/**
 * Icon 컴포넌트의 스토리북 확장 속성입니다.
 * IconProps를 기반으로 하며, 스토리북에서 사용하기 위해 내부 속성들을 가져옵니다.
 * @param propsName - IconProps 타입을 가진 속성의 이름입니다. 해당 값을 기반으로 argTypes와 args를 설정합니다.
 * @example
 *
 * // { argTypes: { trailingIcon: {...}, trailingIconVariant: {...}, ...}}
 * // 다른 컴포넌트의 meta 데이터에 추가합니다.
 * const metaData = getIconMeta('trailingIcon');
 *
 * // 해당 컴포넌트에서 확장한 icon Props를 사용해 storybook에서 사용할 수 있도록 합니다.
 * export const Primary: Story = {
 *  args: {
 *  // ...
 *  },
 *  render: (args) => {
 *   const { trailingIconName, trailingIconVariants, trailingIconSrc ...rest } = args;
 *   return <IconButton
 *             {...rest}
 *             icon={{
 *               iconName: trailingIconName,
 *               variants: trailingIconVariants,
 *               src: trailingIconSrc
 *             }}
 *           />;
 *  },
 * };
 */

export const getIconMeta = (propsName: string, defaultIconName?: string): Meta => {
  return {
    args: {
      [propsName]: undefined,
      [`${propsName}Name`]: defaultIconName || undefined,
      [`${propsName}Variants`]: 'fa-solid',
      [`${propsName}Src`]: undefined,
    },
    argTypes: {
      [propsName]: {
        control: false,
        table: {
          type: { summary: 'IconProps' },
          category: propsName,
        },
        description:
          'Foundation/Icon 컴포넌트의 속성을 사용합니다. <br/>storybook에서 사용하기 위해 내부 속성들을 가져옵니다.',
      },
      [`${propsName}Variants`]: {
        name: `${propsName}.variants`,
        control: 'select',
        options: ['fa-solid', 'fa-regular', 'image'],
        table: {
          type: { summary: 'fa-solid | fa-regular | image' },
          category: propsName,
        },
        description: '아이콘의 스타일 타입을 선택합니다.',
      },
      [`${propsName}Name`]: {
        name: `${propsName}.iconName`,
        control: 'text',
        table: {
          type: { summary: 'IconName' },
          category: propsName,
        },
        description:
          'fontAwesome에서 제공하는 아이콘 이름만 사용 가능합니다.' +
          `<br />"${iconNames.join('", "')}" 등 <br /> <a href="https://fontawesome.com/search?ic=free" target="_blank">FontAwesome Free icon 참고</a>`,
      },
      [`${propsName}Src`]: {
        name: `${propsName}.src`,
        control: 'text',
        table: {
          type: { summary: 'string' },
          category: propsName,
        },
        if: {
          arg: `${propsName}Variants`,
          eq: 'image',
        },
        description: '아이콘의 이미지 URL을 입력합니다.',
      },
    },
  };
};
