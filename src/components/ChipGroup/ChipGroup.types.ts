import type { ChipProps } from '../Chip/Chip.types';
import type { IconProps } from '../Icon/Icon.types';

interface ChipGroupProps {
  variants?: 'primary' | 'secondary';
  size?: 's' | 'm';
  paddingVariants?: boolean;
  paddingHorizontal?: boolean;
  gradientLeading?: boolean;
  gradientTrailing?: boolean;
  gradientColor?: string;
  chips?: (ChipProps & { id: string })[];
  /** Chip group 좌측에 필터 등의 기능을 하는 버튼 */
  trailingButtonIcon?: IconProps;
  trailingButtonClick?: () => void;
  /** 다중 선택 */
  multiple?: boolean;
  /** 외부에서 제어하는 선택된 Chip의 id 목록 */
  selectedChipIds?: string[];
  /**
   * 선택된 Chip id 배열이 변경될 때 호출됨
   * 외부 상태(selectedChipIds)를 제어하려는 경우 사용
   * @param ids 선택된 Chip의 id 목록
   */
  onSelectionChange?: (ids: string[]) => void;
  /**
   * 선택 기능 활성화 여부
   * false인 경우 선택 기능은 비활성화 되며
   * selectedChipIds는 정적값으로 사용됨
   * @default true
   */
  selectable?: boolean;
  /**
   * 선택 상태(selected)에 따라 Chip 컴포넌트의 props를 동적으로 수정할 수 있는 함수
   * @param selected Chip이 선택된 상태인지 여부
   * @param chip 원본 ChipProps
   * @returns 수정된 ChipProps
   */
  renderChips?: (selected: boolean, chip: ChipProps) => ChipProps;
}

export type { ChipGroupProps };
