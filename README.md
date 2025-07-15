# CH Design System

React 프로젝트에서 일관된 UI 구현을 위한 디자인 시스템입니다.

---

## 📦 외부 프로젝트에 설치

### 개발용 로컬 설치

```bash
# 로컬 경로에서 설치
npm install [프로젝트 경로]

# 또는 .tgz 파일로 설치 (npm pack 사용)
npm install ./ch-design-system-1.0.0.tgz
```

---

## 🎨 글로벌 스타일 적용

디자인 시스템 사용을 위해 다음 스타일 파일을 반드시 import 해야 합니다:

```ts
import '@ch/design-system/base.css';           // fontAwesome, body font 등 글로벌 스타일
import '@ch/design-system/themes/default.css'; // 테마 색상, 폰트 변수 등

import '@ch/design-system/variables.css'; // (선택) 색상, 타이포그래피 변수
```

---

## 📁 폴더 구조

```
/src
├── components        # UI 컴포넌트
├── css               # 전역 스타일 파일
│   └── theme
│       ├── default.css   # style-dictionary로 생성됨 (자동 생성, 수정 금지)
│       └── naver.css     # 테스트용 커스텀 테마 (변수명 default.css와 동일하게 유지)
├── scss              # SCSS 변수, 믹스인 등
├── tokens            # Tokens Studio에서 추출된 JSON (자동 생성, 수정 금지)
├── types             # 공통 타입 정의
└── index.ts          # 진입점. 컴포넌트 추가 시 수정 필요
```

---

## 🛠️ 토큰 빌드 방법

디자인 토큰을 기반으로 SCSS 변수 및 테마 CSS를 생성합니다.

```bash
pnpm run build:tokens
```

- `/tokens` 내 JSON과 `style-dictionary.config.mjs` 설정 파일을 기반으로
- `/src/scss` 내 SCSS 변수와 mixin 파일이 자동 생성됩니다.

---

## 🧪 사용 예시

```tsx
import { Button } from '@ch/design-system';

<Button variant="primary">확인</Button>
```

---

## 🔧 환경 요구사항

- Node.js: `>=18.x`
- PNPM: `>=8.x`

---

## 📦 Peer Dependencies

다음 패키지는 사용자 프로젝트에서 별도로 설치되어야 합니다:

- `react`
- `react-dom`
- (옵션) `@emotion/react`, `@fortawesome/fontawesome-free` 등

---

## ⚠️ 주의사항

- `tokens` 및 `themes/default.css`는 자동 생성 파일이므로 **수동으로 수정하지 마세요**.
- `index.ts`는 외부로 노출할 컴포넌트를 추가할 때 반드시 함께 수정해야 합니다. (추후 자동화 예정)