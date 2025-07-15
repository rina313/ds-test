import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import type { IconProps } from '../Icon/Icon.types';

export type Variants = 'primary' | 'secondary';
export type ButtonSize = 's' | 'm' | 'l';

interface IconTypes {
  /** 라벨 앞쪽에 위치하는 아이콘 */
  leadingIcon?: IconProps;
  /** 러밸 뒤쪽에 위치하는 아이콘 */
  trailingIcon?: IconProps;
}
interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: Variants;
}

interface SolidButtonProps extends BaseButtonProps, IconTypes {
  size?: ButtonSize;
  iconOnly?: boolean;
}

interface OutlineButtonProps extends BaseButtonProps, IconTypes {
  size?: ButtonSize;
  iconOnly?: boolean;
}

interface IconButtonProps extends BaseButtonProps {
  icon?: IconProps;
  size?: ButtonSize | 'xl';
  badge?: boolean;
}

interface TextLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement>, IconTypes {
  href: string;
}
interface TextBlockButtonProps extends BaseButtonProps, IconTypes {
  href?: undefined;
}

type TextButtonProps = {
  variants?: Variants;
  disabled?: boolean;
  size?: ButtonSize;
  active?: boolean;
} & IconTypes &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export type {
  SolidButtonProps,
  OutlineButtonProps,
  IconButtonProps,
  TextLinkButtonProps,
  TextBlockButtonProps,
  TextButtonProps,
};
