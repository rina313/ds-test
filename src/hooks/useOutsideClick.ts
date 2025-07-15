import { useEffect, type RefObject } from 'react';

/** 외부 영역 클릭 시 닫힘 Hook */
export const useOutsideClick = (
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  callback: (e: MouseEvent) => void,
): void => {
  useEffect(() => {
    const refsArray = Array.isArray(refs) ? refs : [refs];
    const handleClickOutside = (e: MouseEvent) => {
      const isOutside = refsArray.every(
        (ref) => !ref.current || !ref.current.contains(e.target as Node),
      );
      if (isOutside) {
        callback(e);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, callback]);
};
