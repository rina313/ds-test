import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Avatar from './Avatar';

describe('Avatar 컴포넌트', () => {
  it('기본 이미지 또는 아이콘이 렌더링된다', () => {
    render(<Avatar />);
    const avatarWrapper = screen.getByTestId('avatar');
    expect(avatarWrapper).toBeInTheDocument();
  });

  it('imageUrl이 있을 경우 img 태그가 렌더링된다', () => {
    render(<Avatar imageUrl='https://example.com/avatar.png' />);
    const avatarImage = screen.getByAltText('Avatar');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.png');

    // 아이콘이 없음을 보장
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('imageUrl이 없을 경우 Icon 컴포넌트가 렌더링된다', () => {
    render(<Avatar />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    // 이미지가 없음을 보장
    expect(screen.queryByAltText('Avatar')).not.toBeInTheDocument();
  });
});
