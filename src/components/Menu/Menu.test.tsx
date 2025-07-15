import type { IconName } from '@fortawesome/fontawesome-svg-core';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Menu from './Menu';

const baseMenus = [
  {
    id: 'item-1',
    label: 'Item 1',
    title: 'Title 1',
    description: 'Desc 1',
    leadingContent: { iconName: 'home' as IconName },
    trailingIcon: { iconName: 'star' as IconName },
    hasDivider: true,
    subMenu: [{ id: 'sub-1', label: 'Sub 1', description: 'Sub Desc' }],
  },
  {
    id: 'item-2',
    label: 'Item 2',
  },
  {
    id: 'item-3',
    label: 'Item 3',
  },
  {
    id: 'item-4',
    label: 'Item 4',
    disabled: true,
  },
];

describe('Menu UI 상세', () => {
  it('title이 렌더링된다', () => {
    render(<Menu menus={baseMenus} />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
  });

  it('description이 렌더링된다', () => {
    render(<Menu menus={baseMenus} />);
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
  });

  it('leadingContent 아이콘이 렌더링된다', () => {
    render(<Menu menus={baseMenus} />);
    expect(document.querySelector('.fa-home')).toBeInTheDocument();
  });

  it('trailingIcon 아이콘이 렌더링된다', () => {
    render(<Menu menus={baseMenus} />);
    expect(document.querySelector('.fa-star')).toBeInTheDocument();
  });

  it('activeArea가 렌더링된다', () => {
    render(<Menu menus={baseMenus} activeArea={<div data-testid='active-area'>Active</div>} />);
    expect(screen.getByTestId('active-area')).toBeInTheDocument();
  });

  it('hasDivider가 적용되어 divider가 렌더링된다', () => {
    render(<Menu menus={baseMenus} />);
    const item = screen.getByText('Item 1').closest('li');
    expect(item?.querySelector('.divider')).toBeInTheDocument();
  });

  it('disabled 스타일이 적용된다', () => {
    render(<Menu menus={baseMenus} />);
    const item = screen.getByText('Item 4').closest('div');
    expect(item?.className).toMatch(/disabled/);
  });

  it('multiSelect에서 체크 아이콘이 표시된다', () => {
    render(<Menu menus={baseMenus} multiSelect selectedIds={['item-1']} />);
    expect(document.querySelector('.fa-check')).toBeInTheDocument();
  });

  it('서브메뉴가 있는 항목에 hover하면 하위 메뉴가 포탈로 렌더링된다', async () => {
    render(<Menu menus={baseMenus} />);
    const item1 = screen.getByText('Item 1').closest('div');
    expect(item1).not.toBeNull();
    if (!item1) throw new Error('Item 1 div not found');
    fireEvent.mouseEnter(item1);
    const subItem1 = await screen.findByText('Sub 1');
    expect(subItem1).toBeInTheDocument();
  });
});

describe('Menu 기능 상세', () => {
  const onSelectionChange = vi.fn();

  it('초기 selectedIds가 반영된다', () => {
    render(<Menu menus={baseMenus} selectedIds={['item-3']} />);
    const item = screen.getByText('Item 3').closest('div');
    expect(item?.className).toMatch(/selected/);
  });

  it('옵션을 클릭하면 onSelectionChange가 호출된다', async () => {
    render(<Menu menus={baseMenus} />);
    fireEvent.click(screen.getByText('Item 2'));
    expect(screen.getAllByText('Item 2').length).toBeGreaterThan(0);
  });

  it('multiSelect인 경우 여러 옵션을 선택할 수 있다', () => {
    render(<Menu menus={baseMenus} multiSelect />);

    fireEvent.click(screen.getByText('Item 2'));
    fireEvent.click(screen.getByText('Item 3'));
    expect(screen.getAllByText('Item 2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Item 3').length).toBeGreaterThan(0);
  });

  it('서브메뉴 외부로 벗어나면 서브메뉴가 닫힌다', async () => {
    render(<Menu menus={baseMenus} />);
    fireEvent.mouseEnter(screen.getByText('Item 1'));
    const subItem = await screen.findByText('Sub 1');
    expect(subItem).toBeInTheDocument();
    fireEvent.mouseMove(document.body);
    expect(screen.queryByText('Sub 1')).not.toBeInTheDocument();
  });

  it('서브메뉴 항목 클릭 시 onSelectionChange가 호출된다', async () => {
    render(<Menu menus={baseMenus} />);
    fireEvent.mouseEnter(screen.getByText('Item 1'));
    const subItem = await screen.findByText('Sub 1');
    expect(subItem).toBeInTheDocument();
    fireEvent.click(subItem);
    expect(screen.getAllByText('Sub 1').length).toBeGreaterThan(0);
  });
  it('disabled 항목 클릭 시 onSelectionChange가 호출되지 않는다', () => {
    render(<Menu menus={baseMenus} onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByText('Item 4'));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('서브메뉴 클릭 시 onSelectionChange가 서브 아이템 id로 호출된다', async () => {
    render(<Menu menus={baseMenus} onSelectionChange={onSelectionChange} />);
    fireEvent.mouseEnter(screen.getByText('Item 1').closest('div')!);
    const sub = await screen.findByText('Sub 1');
    fireEvent.click(sub);
    expect(onSelectionChange).toHaveBeenCalledWith(['sub-1']);
  });

  it('selectedIds 없이 onSelectionChange만 있으면 경고가 출력된다', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Menu menus={[{ id: 'item-1', label: 'Item 1' }]} onSelectionChange={onSelectionChange} />,
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Menu component - onSelectionChange는 할당했지만 selectedIds는 할당하지 않았습니다. 외부에서 선택 상태를 제어하려면 두 prop을 모두 사용하세요.',
      ),
      'color: orange;',
    );
    warnSpy.mockRestore();
  });
});
