import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Tag from './Tag';

describe('Tag', () => {
  it('props 없이도 렌더링된다', () => {
    const { container } = render(<Tag />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('label만 있을 때 정상 렌더링', () => {
    render(<Tag label='테스트 태그' />);
    expect(screen.getByText('테스트 태그')).toBeInTheDocument();
  });

  it('variants, size props에 따라 class가 적용됨', () => {
    const { container } = render(<Tag label='outline-s' variants='outline' size='s' />);
    const tagDiv = container.firstChild as HTMLElement;
    expect(tagDiv.className).toMatch(/outline/);
    expect(tagDiv.className).toMatch(/s/);
  });

  it('iconName이 있으면 아이콘이 렌더링됨', () => {
    const { container } = render(<Tag label='아이콘 태그' iconName='check' />);
    const icon = container.querySelector('span > i');
    expect(icon).toHaveClass('fa', 'fa-check');
  });

  it('label이 없으면 텍스트 span이 렌더되지 않음', () => {
    const { container } = render(<Tag iconName='check' />);
    expect(container.querySelector('span:not([class])')).toBeNull();
  });

  it('기본 variants는 solid이고 기본 size는 m이다', () => {
    const { container } = render(<Tag label='기본값' />);
    const tagDiv = container.firstChild as HTMLElement;
    expect(tagDiv).toHaveClass('solid');
    expect(tagDiv).toHaveClass('m');
  });

  it('iconName이 없으면 icon-wrapper가 렌더링되지 않는다', () => {
    const { container } = render(<Tag label='아이콘 없음' />);
    const iconWrapper = container.querySelector('.icon-wrapper');
    expect(iconWrapper).not.toBeInTheDocument();
  });

  it('label이 있으면 padding-vertical 클래스가 적용된다', () => {
    const { container } = render(<Tag label='패딩 테스트' />);
    const tagDiv = container.firstChild as HTMLElement;
    expect(tagDiv).toHaveClass('padding-vertical');
  });

  it('label이 없으면 padding-vertical 클래스가 적용되지 않는다', () => {
    const { container } = render(<Tag iconName='check' />);
    const tagDiv = container.firstChild as HTMLElement;
    expect(tagDiv).not.toHaveClass('padding-vertical');
  });

  it('icon과 label이 모두 있을 때 정상적으로 렌더링된다', () => {
    const { container } = render(<Tag iconName='star' label='별표 태그' />);

    expect(screen.getByText('별표 태그')).toBeInTheDocument();
    const icon = container.querySelector('span > i');
    expect(icon).toHaveClass('fa', 'fa-star');

    const tagDiv = container.firstChild as HTMLElement;
    expect(tagDiv).toHaveClass('padding-vertical');
  });

  it('모든 props가 함께 적용될 때 정상적으로 작동한다', () => {
    const { container } = render(
      <Tag variants='outline' size='s' iconName='heart' label='완전한 태그' />,
    );

    const tagDiv = container.firstChild as HTMLElement;
    expect(tagDiv).toHaveClass('outline', 's', 'padding-vertical');

    expect(screen.getByText('완전한 태그')).toBeInTheDocument();
    const icon = container.querySelector('span > i');
    expect(icon).toHaveClass('fa', 'fa-heart');
  });
});
