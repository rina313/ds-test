import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ChipGroup from './ChipGroup';

const chips = [
  { id: 'chip-1', label: '칩 1' },
  { id: 'chip-2', label: '칩 2' },
  { id: 'chip-3', label: '칩 3' },
];

describe('ChipGroup', () => {
  it('ChipGroup컴포넌트가 렌더링된다', () => {
    render(<ChipGroup chips={chips} />);
    chips.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('Chip 컴포넌트를 클릭하면 onSelectionChange가 호출된다', () => {
    const onChange = vi.fn();
    render(<ChipGroup chips={chips} onSelectionChange={onChange} selectedChipIds={[]} />);
    fireEvent.click(screen.getByText('칩 2'));
    expect(onChange).toHaveBeenCalledWith(['chip-2']);
  });

  it('multiple=true이고 selectedChipIds가 빈 배열일 때 여러 칩을 선택하면 여러 칩이 active가 된다', () => {
    render(<ChipGroup chips={chips} multiple selectedChipIds={[]} />);
    fireEvent.click(screen.getByText('칩 1'));
    fireEvent.click(screen.getByText('칩 2'));
    const chip1 = screen.getByText('칩 1').parentElement;
    const chip2 = screen.getByText('칩 2').parentElement;
    expect(chip1).toHaveClass('active');
    expect(chip2).toHaveClass('active');
  });

  it('multiple=false이고 selectedChipIds가 빈 배열일 때 하나의 칩만 active가 된다', () => {
    render(<ChipGroup chips={chips} selectedChipIds={[]} />);
    fireEvent.click(screen.getByText('칩 1'));
    fireEvent.click(screen.getByText('칩 2'));
    const chip1 = screen.getByText('칩 1').parentElement;
    const chip2 = screen.getByText('칩 2').parentElement;
    expect(chip1).not.toHaveClass('active');
    expect(chip2).toHaveClass('active');
  });

  it('selectedChipIds를 넘기지 않으면 chips[0].id가 기본 active가 된다', () => {
    render(<ChipGroup chips={chips} />);
    const chip1 = screen.getByText('칩 1').parentElement;
    const chip2 = screen.getByText('칩 2').parentElement;
    expect(chip1).toHaveClass('active');
    expect(chip2).not.toHaveClass('active');
  });

  it('selectedChipIds로 외부에서 선택 상태 제어가 가능하다.', () => {
    render(<ChipGroup chips={chips} selectedChipIds={['chip-2']} />);
    const selectedChip = screen.getByText('칩 2').parentElement;
    expect(selectedChip).toHaveClass('active');
  });

  it('selectable=false면 선택 기능이 비활성화 된다.', () => {
    render(<ChipGroup chips={chips} selectable={false} />);
    fireEvent.click(screen.getByText('칩 1'));
  });

  it('renderChips를 통해 선택 상태 기반으로 Chip을 커스텀 렌더링할 수 있다', () => {
    render(
      <ChipGroup
        chips={chips}
        selectedChipIds={['chip-1']}
        renderChips={(selected, chip) => ({
          ...chip,
          label: selected ? `✔ ${chip.label}` : chip.label,
        })}
      />,
    );
    expect(screen.getByText('✔ 칩 1')).toBeInTheDocument();
  });

  it('gradientColor prop이 CSS 변수에 반영된다', () => {
    const { container } = render(
      <ChipGroup chips={chips} gradientColor='#123456' gradientTrailing gradientLeading />,
    );
    const groupEl = container.firstChild as HTMLElement;
    expect(groupEl.style.getPropertyValue('--chip-gradient-color')).toBe('#123456');
  });

  it('trailingButtonClick이 정상적으로 동작한다', () => {
    const onClick = vi.fn();
    render(
      <ChipGroup
        chips={chips}
        trailingButtonIcon={{ iconName: 'plus', alt: '추가' }}
        trailingButtonClick={onClick}
      />,
    );
    fireEvent.click(screen.getByLabelText('추가'));
    expect(onClick).toHaveBeenCalled();
  });

  it('variants, size props에 따라 class가 적용된다', () => {
    const { container } = render(<ChipGroup chips={chips} variants='secondary' size='s' />);
    const chipDiv = container.querySelector('ul > li > div');
    expect(chipDiv).toHaveClass('secondary');
    expect(chipDiv).toHaveClass('s');
  });

  it('paddingVariants, paddingHorizontal에 따라 class가 추가되고 스타일이 적용된다', () => {
    const { container } = render(<ChipGroup chips={chips} paddingVariants paddingHorizontal />);
    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('padding-variants');
    expect(group).toHaveClass('padding-horizontal');
  });

  it('스크롤 위치에 따라 gradient-leading/trailing 클래스가 적용된다', () => {
    const { container } = render(
      <ChipGroup
        chips={Array.from({ length: 20 }, (_, i) => ({ id: `${i}`, label: `칩 ${i}` }))}
        gradientLeading
        gradientTrailing
      />,
    );
    const scrollContainer = container.querySelector('ul') as HTMLUListElement;
    // scroll 조건 강제 주입
    Object.defineProperty(scrollContainer, 'scrollLeft', { configurable: true, value: 10 });
    Object.defineProperty(scrollContainer, 'scrollWidth', { configurable: true, value: 1000 });
    Object.defineProperty(scrollContainer, 'clientWidth', { configurable: true, value: 500 });
    // scroll 이벤트 강제 발생 → useEffect 내 updateGradient 실행을 유도
    fireEvent.scroll(scrollContainer);
    const group = container.firstChild as HTMLElement;
    expect(group.className).toMatch(/gradient-leading/);
    expect(group.className).toMatch(/gradient-trailing/);
  });

  it('selectedChipIds값 없이 onSelectionChange만 할당된 경우 경고 로그가 출력된다.', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ChipGroup chips={chips} onSelectionChange={vi.fn()} />);
    expect(
      consoleWarnSpy.mock.calls.some((call) =>
        call.some((arg) => typeof arg === 'string' && arg.includes('ChipGroup component')),
      ),
    ).toBe(true);
    consoleWarnSpy.mockRestore();
  });
});
