import type { ReactNode } from 'react';

import type { IconProps } from '../Icon/Icon.types';

export interface SectionMessageProps {
  variants?: 'horizontal' | 'vertical';
  icon?: IconProps;
  trailingChildren?: ReactNode;
  title?: string;
  description?: string;
}
