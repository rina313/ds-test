import type { IconProps } from '../Icon/Icon.types';

interface ChipProps {
  label?: string;
  disabled?: boolean;
  size?: 'xs' | 's' | 'm';
  active?: boolean;
  variants?: 'primary' | 'secondary';
  onClick?: () => void;
  leadingIcon?: IconProps;
  leadingClick?: () => void;
  trailingIcon?: IconProps;
  trailingClick?: () => void;
}

export type { ChipProps };
