type WarnArgs = Record<string, string | number | boolean | undefined>;

/**
 * 경고 메시지를 출력합니다.
 * 개발 환경에서만 동작하며, 프로덕션 환경에서는 출력되지 않습니다.
 * @param message ./message.ts에 정의된 메시지 상수 중 하나를 사용하세요.
 * @param args 메시지에 보여지는 정보들로 경고에 영향을 끼치는 값들을 넘겨주세요.
 */
export function warn(message: string, args?: WarnArgs): void {
  if (process.env.NODE_ENV !== 'production') {
    let argStr = '';
    if (args) {
      argStr =
        ' ' +
        Object.entries(args)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
    }
    console.warn(`%c[@ch/design-system] ${message}${argStr}`, 'color: orange;');
  }
}
