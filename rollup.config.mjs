import path from 'path';
import { fileURLToPath } from 'url';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import autoprefixer from 'autoprefixer';
import alias from '@rollup/plugin-alias';

// __dirname 대체
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // ✅ JS, CSS 번들
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        modules: {
          generateScopedName: '[hash:base64:5]'
        },
        use: [
          ['sass', {
            includePaths: [
              path.resolve(process.cwd(), 'src'),
              'node_modules'
            ]
          }]
        ],
        extract: false,
        inject: true,
        minimize: true
      }),
      copy({
        targets: [
          { src: 'src/scss/**/*', dest: 'dist' },
          { src: 'src/css/themes/fonts/**/*', dest: 'dist' },
          { src: 'src/css/themes/**/*.css', dest: 'dist' },
          {
            src: 'src/css/themes/**/*.css',
            dest: 'dist',
            rename: (name) => `${name}.min.css`,
            transform: (contents) => contents.toString().replace(/\s+/g, ' ').trim()
          },
          { src: 'src/types/**/*', dest: 'dist' }
        ],
        flatten: false
      })
    ],
    external: ['react', 'react-dom']
  },

  // ✅ SCSS → CSS
  {
    input: {
      'base': 'src/scss/base.scss'
    },
    output: {
      dir: 'dist/css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: path.resolve('dist/css/base.min.css'),
        minimize: true,
        emitFiles: false,
        use: [
          ['sass', {
            includePaths: [
              path.resolve(process.cwd(), 'src'),
              'node_modules'
            ]
          }]
        ],
        plugins: [autoprefixer]
      })
    ]
  },

  // ✅ 타입 번들 생성
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [
      alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
      }),
      dts({
        compilerOptions: {
          baseUrl: '.',
          paths: {},  // 절대경로 매핑 제거
          declaration: true
        }
      })
    ],
    external: [
      'react', 
      'react-dom',
      'react-datepicker/dist/react-datepicker.css'
    ]
  }
];