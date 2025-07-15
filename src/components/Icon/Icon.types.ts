import type { IconName } from '@fortawesome/fontawesome-svg-core';

export type IconVariants = 'fa-regular' | 'fa-solid' | 'image' | 'brand';
export type IconSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface IconProps {
  variants?: IconVariants;
  size?: IconSize;
  iconName?: IconName; // FontAwesome class 또는 image 이름
  src?: string; // variants === 'image'일 경우 필수
  alt?: string;
  className?: string;
}

/**
 * iconProps를 사용하는 컴포넌트 중 storybook에서 icon props를 확장해 control을 추가하기 위한 타입
 */
type ExtendOneIconProps<Prefix extends string> = {
  [K in `${Prefix}`]?: IconProps;
} & {
  [K in `${Prefix}Variants`]?: IconVariants;
} & {
  [K in `${Prefix}Name`]?: IconName;
} & {
  [K in `${Prefix}Src`]?: string;
};
type ExtendEach<P extends string> = P extends any ? ExtendOneIconProps<P> : never;
// 유니언을 인터섹션으로 바꾸는 마법
type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer I) => any
  ? I
  : never;

export type ExtendIconProps<T, Prefixes extends string> = T &
  UnionToIntersection<ExtendEach<Prefixes>>;
