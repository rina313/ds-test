import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  "stories": [
    '../src/components/**/*.stories.@(ts|tsx)'
  ],
  "addons": [
    "@storybook/addon-essentials", // 필수
    "@chromatic-com/storybook", // chromatic라이브러리 연동시 필요
    "@storybook/experimental-addon-test", // 테스트
    "@storybook/addon-designs", // 피그마와 연동
    'chromatic/addon',
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "docs": {
    "autodocs": true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript', // 이 부분이 중요!
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config, { configType }) => {
    config.resolve = {
      alias: {
        '@': resolve(__dirname, '../src'),
        'components': resolve(__dirname, '../src/components'), // optional
        'scss': resolve(__dirname, '../src/scss'),
      },
    };
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: '', // 전역변수 삽입 시 사용 (예: @use 'src/scss/variables';)
          includePaths: [resolve(__dirname, '../src')],
        },
      },
    };
    return config;
  },
};
export default config;