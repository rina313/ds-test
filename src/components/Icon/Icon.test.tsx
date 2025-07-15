import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { warn } from '@/utils/logger';

import { Icon } from './Icon';

vi.mock('@/utils/logger', () => ({
  warn: vi.fn(),
}));

describe('Icon', () => {
  it('기본값으로 fa-solid 클래스가 포함된 아이콘을 렌더링한다', () => {
    render(<Icon iconName='check' alt='체크' />);
    const iconWrapper = screen.getByLabelText('체크');
    expect(iconWrapper.querySelector('i')).toHaveClass('fa-solid');
    expect(iconWrapper.querySelector('i')).toHaveClass('fa-check');
  });

  it('variants가 image이고 src가 존재할 경우 이미지 아이콘으로 렌더링한다', () => {
    render(<Icon variants='image' src='/test.png' alt='테스트 이미지' />);
    const img = screen.getByAltText('테스트 이미지');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.png');
  });

  it('잘못된 prop 조합일 때 warn이 호출된다', () => {
    render(<Icon variants='image' />); // src 없음
    expect(warn).toHaveBeenCalledWith(expect.any(String), {
      variants: 'image',
      iconName: undefined,
      src: undefined,
    });

    render(<Icon variants='fa-solid' />); // iconName 없음
    expect(warn).toHaveBeenCalledWith(expect.any(String), {
      variants: 'fa-solid',
      iconName: undefined,
      src: undefined,
    });

    render(<Icon />); // 아무 prop도 없음
    expect(warn).toHaveBeenCalledWith(expect.any(String), {
      variants: 'fa-solid',
      iconName: undefined,
      src: undefined,
    });
  });

  it('alt 텍스트가 aria-label에 정상적으로 반영된다 (font icon)', () => {
    render(<Icon iconName='bolt' alt='번개 아이콘' />);
    const wrapper = screen.getByLabelText('번개 아이콘');
    expect(wrapper).toBeInTheDocument();
  });

  it('이미지 아이콘일 경우 wrapper에는 aria-label이 없어야 한다', () => {
    render(<Icon variants='image' src='/icon.png' alt='이미지' />);
    const img = screen.getByAltText('이미지');
    expect(img.parentElement).not.toHaveAttribute('aria-label');
    expect(img.parentElement).not.toHaveAttribute('role');
  });

  it('size prop이 wrapper에 클래스 형태로 반영된다', () => {
    render(<Icon iconName='bell' size='xl' alt='벨' />);
    const wrapper = screen.getByLabelText('벨');
    expect(wrapper).toHaveClass('xl');
  });
});
