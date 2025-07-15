import type { Config } from 'jest';

const config: Config = {
  // ts-jest를 사용해 TypeScript 파일을 변환합니다.
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // React 컴포넌트 테스트에 적합한 환경
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 테스트 전 환경설정 파일
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: [
    '<rootDir>/src/**/*.test.(ts|tsx)', // 테스트 파일 패턴
    '<rootDir>/src/**/*.spec.(ts|tsx)',
  ],
  moduleNameMapper: {
    // CSS, 이미지 등 비자바스크립트 파일 무시
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // 필요에 따라 coverage 옵션 등 추가 가능
};

export default config;
