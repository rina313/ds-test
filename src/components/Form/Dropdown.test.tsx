import { render, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Dropdown from './Dropdown';

const baseMenus = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];
const baseProps = {
  menus: baseMenus,
  onSelectionChange: vi.fn(),
};
describe('Dropdown', () => {
  it('labelText가 있으면 라벨이 렌더링된다', () => {
    render(<Dropdown labelText='Test Label' {...baseProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
  it('isTooltip이 true면 툴팁 아이콘이 렌더링된다', () => {
    render(<Dropdown {...baseProps} isTooltip />);
    expect(document.querySelector('i')).toBeInTheDocument();
  });

  it('tooltipProps가 있으면 툴팁 텍스트가 렌더링된다', async () => {
    render(<Dropdown {...baseProps} isTooltip tooltipProps={{ label: '툴팁', children: '' }} />);
    const icon = screen.getByTestId('form-label-tooltip');
    await userEvent.hover(icon);
    expect(await screen.findByText('툴팁')).toBeInTheDocument();
  });

  it('placeholder가 렌더링된다', () => {
    render(<Dropdown placeholder='Select option' {...baseProps} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('negative가 true면 negative 스타일이 적용된다', () => {
    const { container } = render(<Dropdown {...baseProps} negative />);
    expect(container.querySelector('.negative')).toBeTruthy();
  });

  it('helperText가 있으면 하단 텍스트가 렌더링된다', () => {
    render(<Dropdown {...baseProps} helperText='도움말' />);
    expect(screen.getByText('도움말')).toBeInTheDocument();
  });

  it('옵션 라벨을 클릭하면 하단에 메뉴가 렌더링된다', () => {
    render(<Dropdown placeholder='Select option' {...baseProps} />);
    fireEvent.click(screen.getByText('Select option'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('disabled가 true면 하단에 메뉴가 렌더링 되지 않는다', () => {
    render(<Dropdown labelText='Test Label' placeholder='Select option' {...baseProps} disabled />);
    fireEvent.click(screen.getByText('Select option'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('하단에 렌더링된 메뉴의 옵션을 클릭하면 옵션의 라벨에 대한 onSelectionChange가 호출된다', async () => {
    const { onSelectionChange } = baseProps;
    render(<Dropdown labelText='Test Label' placeholder='Select option' {...baseProps} />);
    fireEvent.click(screen.getByText('Select option'));
    const option2 = await screen.findByText('Option 2');
    fireEvent.click(option2);
    expect(onSelectionChange).toHaveBeenCalledWith(['2']);
  });

  it('multiSelect가 true인경우 선택된 옵션이 ChipGroup으로 표시된다', async () => {
    render(
      <Dropdown labelText='Test Label' placeholder='Select option' {...baseProps} multiSelect />,
    );
    fireEvent.click(screen.getByText('Select option'));
    fireEvent.click(await screen.findByText('Option 1'));
    fireEvent.click(await screen.findByText('Option 2'));
    const chipGroup = screen.getByTestId('dropdown-chip-group');
    expect(within(chipGroup).getByText('Option 1')).toBeInTheDocument();
    expect(within(chipGroup).getByText('Option 2')).toBeInTheDocument();
  });

  it('하단에 메뉴가 활성화된 상태에서 외부영역 클릭 시 메뉴가 닫힌다', () => {
    render(<Dropdown labelText='Test Label' placeholder='Select option' {...baseProps} />);
    fireEvent.click(screen.getByText('Select option'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
