import { useState } from 'react';

interface UseSelectControllerProps {
  selectedIds?: string[];
  /** 외부 데이터를 업데이트 할 때 사용하는 함수  */
  onSelectionChange?: (ids: string[]) => void;
  /** 다중 선택 기능 활성화 */
  multiSelect?: boolean;
  /** 선택기능 활성화 */
  selectable?: boolean;
  /** selectedIds === undefined인 경우 선택기능이 활성화되어 있다면 선택 항목의 초기 값으로 활용 */
  initialItemIds?: string[]; // ex: [chips[0].id]
}
interface UseSelectControllerReturn {
  /** 선택 항목 */
  selectedIds: string[];
  /**
   * 선택 상태 확인 함수
   * @param id 선택할 항목의 ID
   * @returns {boolean} 선택 상태
   */
  isSelected: (id: string) => boolean;
  /**
   * 특정 항목의 선택 상태를 토글합니다.
   * - multiSelect: 선택되어 있으면 해제, 아니면 추가
   * - 단일 선택 모드: 이미 선택된 항목이면 무시, 아니면 해당 항목만 선택
   * @param id 선택할 항목의 ID
   */
  toggle: (id: string) => void;
}

/**
 * 선택 가능한 UI 컴포넌트의 선택 상태를 제어하는 커스텀 훅입니다.
 * 외부에서 데이터를 제어하지 않는 경우 기본 기능을 제공합니다.
 * 단일 / 다중 선택, 선택 불가능 상태 등을 통합 관리합니다.
 */
export const useSelectController = ({
  selectedIds,
  onSelectionChange,
  multiSelect = false,
  selectable = true,
  initialItemIds = [],
}: UseSelectControllerProps): UseSelectControllerReturn => {
  // 데이터를 외부에서 제어하는지 구분
  const isControlled = typeof onSelectionChange === 'function';
  const [internalSelected, setInternalSelected] = useState<string[]>(() => {
    return selectedIds || (selectable ? initialItemIds : []);
  });
  // 데이터 제어방식에 따라 현재 사용하는 select data가 달라짐
  const currentSelected = isControlled || !selectable ? (selectedIds ?? []) : internalSelected;
  const isSelected = (id: string) => currentSelected.includes(id);
  const toggle = (id: string) => {
    if (!selectable) return;
    let next: string[];
    if (multiSelect) {
      next = isSelected(id) ? currentSelected.filter((x) => x !== id) : [...currentSelected, id];
    } else {
      next = [id];
    }
    if (isControlled) onSelectionChange!(next);
    else setInternalSelected(next);
  };

  return {
    selectedIds: currentSelected,
    isSelected,
    toggle,
  };
};
