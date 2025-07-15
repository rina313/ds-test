interface SliderProps {
  /** 범위 최소 값 */
  min?: number;
  /** 범위 최대 값 */
  max: number;
  /** 설정된 최소 값 */
  minValue?: number;
  /** 설정된 최대 값 */
  maxValue?: number;
  /** 최소값 ∙ 최대값 동시 설정 여부 */
  isSingle?: boolean;
  /** 범위 값 변경 핸들러 */
  onChangeRange?: (value: number | [number, number]) => void;
  /** 상단 라벨 텍스트 */
  labelText?: string;
  /** 상단 범위 값 노출 여부 */
  showValue?: boolean;
  /** 최소 / 최대 단위 텍스트 */
  unitText?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}
export type { SliderProps };
