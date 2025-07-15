import { useEffect, useState } from 'react';

/** Dropdown / Datepicker 의 Label 기준으로 하위 컴포넌트의 위치를 계산하는 Hook */
export const useRefPosition = (
  isOpen: boolean,
  wrapperRef: React.RefObject<HTMLElement | null>,
): { style: React.CSSProperties } => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);
  return { style };
};
