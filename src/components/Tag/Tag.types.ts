import type { IconName } from '@fortawesome/fontawesome-svg-core';

interface TagProps {
  variants?: 'solid' | 'outline';
  size?: 's' | 'm';
  iconName?: IconName;
  label?: string;
}

export type { TagProps };
