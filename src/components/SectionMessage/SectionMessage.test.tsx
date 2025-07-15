import { render, screen } from '@testing-library/react';

import SectionMessage from './SectionMessage';

describe('SectionMessage', () => {
  it('title, description이 정상적으로 렌더링된다', () => {
    render(<SectionMessage title='제목' description='설명' />);
    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByText('설명')).toBeInTheDocument();
  });

  it('props 없이도 렌더링된다', () => {
    const { container } = render(<SectionMessage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('title만 있을 때 정상적으로 렌더링된다', () => {
    render(<SectionMessage title='제목만' />);
    expect(screen.getByText('제목만')).toBeInTheDocument();
  });

  it('description만 있을 때 정상적으로 렌더링된다', () => {
    render(<SectionMessage description='설명만' />);
    expect(screen.getByText('설명만')).toBeInTheDocument();
  });

  it('icon prop이 있으면 아이콘이 렌더링된다', () => {
    render(
      <SectionMessage title='제목' description='설명' icon={{ iconName: 'check', alt: '체크' }} />,
    );
    expect(screen.getByLabelText('체크')).toBeInTheDocument();
  });

  it('trailingChildren이 없으면 trailing 영역이 렌더링되지 않는다', () => {
    const { container } = render(<SectionMessage title='제목' description='설명' />);
    const trailingDiv = container.querySelector('.trailing');
    expect(trailingDiv).not.toBeInTheDocument();
  });

  it('variants prop에 따라 content 영역 className이 달라진다', () => {
    const { container } = render(
      <SectionMessage title='제목' description='설명' variants='vertical' />,
    );
    const contentDiv = container.querySelector('div > .content');
    expect(contentDiv?.className).toMatch(/vertical/);
  });

  it('기본 variants는 horizontal이다', () => {
    const { container } = render(<SectionMessage title='제목' description='설명' />);
    const contentDiv = container.querySelector('div > .content');
    expect(contentDiv?.className).toMatch(/horizontal/);
  });

  it('icon prop이 없으면 아이콘이 렌더링되지 않는다', () => {
    render(<SectionMessage title='제목' description='설명' />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('복잡한 trailingChildren도 정상적으로 렌더링된다', () => {
    const complexTrailing = (
      <div>
        <button>버튼1</button>
        <button>버튼2</button>
        <span>텍스트</span>
      </div>
    );

    render(<SectionMessage title='제목' description='설명' trailingChildren={complexTrailing} />);

    expect(screen.getByText('버튼1')).toBeInTheDocument();
    expect(screen.getByText('버튼2')).toBeInTheDocument();
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });

  it('모든 props가 함께 렌더링될 때 정상적으로 작동한다', () => {
    render(
      <SectionMessage
        title='완전한 제목'
        description='완전한 설명'
        variants='vertical'
        icon={{ iconName: 'star', alt: '별' }}
        trailingChildren={<button>액션</button>}
      />,
    );

    expect(screen.getByText('완전한 제목')).toBeInTheDocument();
    expect(screen.getByText('완전한 설명')).toBeInTheDocument();
    expect(screen.getByLabelText('별')).toBeInTheDocument();
    expect(screen.getByText('액션')).toBeInTheDocument();
  });
});
