import type { FormLabelProps } from '../Form/Form.types';

type DatepickerVariant = 'day' | 'month' | 'year';

interface DatepickerProps extends FormLabelProps {
  /** 일/월/년도 선택 */
  variant?: DatepickerVariant;
  /** 날짜 다중 선택 여부 */
  isRange?: boolean;
  /** 단일 선택 시 선택된 날짜 값 / 다중 선택 시 선택된 `시작` 날짜 값 */
  startDate?: Date | null;
  /** 다중 선택 시 선택된 종료 날짜 값 */
  endDate?: Date | null;
  /** 날짜 값 변경 핸들러 */
  onChangeDate?: (value: [Date | null, Date | null]) => void;
  /** 최소 날짜 값 */
  minDate?: Date;
  /** 최대 날짜 값 */
  maxDate?: Date;
}
export type { DatepickerProps, DatepickerVariant };
