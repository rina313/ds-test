import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

import type { SnackBarItem } from '@/components/SnackBar/SnackBar.types';
import SnackBarContainer from '@/components/SnackBar/SnackBarContainer';
import { generateUniqueId } from '@/utils';

export interface SnackBarContextType {
  snackBars: SnackBarItem[];
  showSnackBar: (snackBar: Omit<SnackBarItem, 'id'>) => string;
  hideSnackBar: (id: string) => void;
  hideAllSnackBars: () => void;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);

interface SnackBarProviderProps {
  children: ReactNode;
}

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
  const [snackBars, setSnackBars] = useState<SnackBarItem[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // exit 애니메이션 후 실제로 제거
  const removeSnackBar = useCallback((id: string) => {
    setSnackBars((prev) => prev.filter((snackBar) => snackBar.id !== id));
    timersRef.current.delete(id);
  }, []);

  // exit 상태로 변경
  const hideSnackBar = useCallback(
    (id: string) => {
      setSnackBars((prev) =>
        prev.map((snackBar) => (snackBar.id === id ? { ...snackBar, exiting: true } : snackBar)),
      );
      // exit 애니메이션 시간 후 실제로 제거
      setTimeout(() => {
        removeSnackBar(id);
      }, 200);
      // 타이머 정리
      const timer = timersRef.current.get(id);
      if (timer) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    },
    [removeSnackBar],
  );

  const showSnackBar = useCallback(
    (snackBarData: Omit<SnackBarItem, 'id'>) => {
      const id = generateUniqueId('snackbar');
      const duration = snackBarData.duration ?? 4000; // 기본 4초

      const snackBar: SnackBarItem = {
        ...snackBarData,
        id,
        onClose: snackBarData.onClose
          ? () => {
              snackBarData.onClose?.();
              hideSnackBar(id);
            }
          : undefined,
        trailingButtonClick: snackBarData.trailingButtonClick
          ? () => {
              snackBarData.trailingButtonClick?.(id);
            }
          : undefined,
      };
      setSnackBars((prev) => [...prev, snackBar]);

      // 자동 닫힘 조건 확인 후 자동 닫힘 설정
      const shouldAutoClose = !snackBarData.trailingButtonLabel && !snackBarData.onClose;
      if (shouldAutoClose && duration > 0) {
        const timer = setTimeout(() => {
          hideSnackBar(id);
        }, duration);

        timersRef.current.set(id, timer);
      }

      return id;
    },
    [hideSnackBar],
  );

  const hideAllSnackBars = useCallback(() => {
    // 모든 타이머 정리
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();

    setSnackBars([]);
  }, []);

  const value: SnackBarContextType = {
    snackBars,
    showSnackBar,
    hideSnackBar,
    hideAllSnackBars,
  };

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {snackBars.length > 0 && <SnackBarContainer snackBars={snackBars} />}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = (): SnackBarContextType => {
  const context = useContext(SnackBarContext);

  if (context === undefined) {
    throw new Error('useSnackBar must be used within a SnackBarProvider');
  }

  return context;
};
