type AvatarSize = 'xs' | 's' | 'm';
type AvatarVariant = 'circle' | 'square';

interface AvatarProps {
  /** 아바타 모양 */
  variant?: AvatarVariant;
  /** 아바타 크기 */
  size?: AvatarSize;
  /** 아바타 이미지 URL */
  imageUrl?: string;
}
export type { AvatarProps, AvatarSize };
