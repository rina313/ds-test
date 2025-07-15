import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variants?: 'dot' | 'number';
  size?: 's' | 'm';
  count?: number;
  show?: boolean;
  border?: boolean;
}
