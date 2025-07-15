import type { ReactElement, ReactNode } from 'react';
import { isValidElement } from 'react';

/**
 * ReactNode에서 텍스트만 추출하는 함수
 * @param node ReactNode
 * @returns string
 */
export function extractTextFromReactNode(node: ReactNode): string {
  if (node === null || node === undefined) {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return node as string;
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('');
  }
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return extractTextFromReactNode(element.props.children);
  }
  return '';
}

/**
 * 옵션 배열에 고유 ID를 부여하여 정규화
 * - label이 없으면 `label-${index}`로 대체
 * - id가 없으면 `prefix-index-label` 형식으로 생성
 * - 나머지 속성은 그대로 유지됨
 */
export const normalizeOptions = <T extends { label?: string; id?: string }>(
  options: T[],
  prefix: string = 'opt',
): Omit<T, 'id'>[] => {
  return options.map((opt, index) => {
    const fallbackLabel = opt.label ?? `label-${index}`;
    const fallbackId =
      opt.id ?? `${prefix}-${index}-${encodeURIComponent(fallbackLabel).replace(/%/g, '')}`;
    return {
      ...opt,
      id: fallbackId,
    };
  });
};

/**
 * 고유한 ID를 생성하는 함수
 */
export const generateUniqueId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
