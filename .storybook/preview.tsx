import type { Preview } from '@storybook/react';
import '../src/scss/base.scss';
import '../src/css/themes/default.css';
import './story-style.scss';

import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';

const THEME_LINK_ID = 'theme-link';

function setTheme(theme: string) {
  const href = `/src/css/themes/${theme}.css`; // vite dev 서버 기준 상대경로
  let linkEl = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;

  if (!linkEl) {
    linkEl = document.createElement('link');
    linkEl.id = THEME_LINK_ID;
    linkEl.rel = 'stylesheet';
    document.head.appendChild(linkEl);
  }

  linkEl.href = href;
}

// 초기 테마
setTheme('default');

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: ['default', 'naver'],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    setTheme(context.globals.theme);
    return Story();
  },
];

const preview: Preview = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Foundation',
          'Components',
          [
            'Buttons', ['SolidButton', 'OutlineButton', 'TextButton', 'IconButton'],
            'Chip',
            'Selection Controls', ['Checkbox', 'Radio', 'Switch'],
            'Tab', ['Tab', 'Segmented Control'],
            'Pagination', ['Indicator', 'Counter'],
            'Menu',['Menu','Datepicker','Slider'],
            'Form', ['Textfield', 'Textarea', 'Dropdown','Search input'],
            'Feedback', ['Badge', 'Tag', 'Snack Bar', 'Section Message', 'Tooltip', 'Modal'],
            'Contents', ['Avatar', 'Empty State', 'Table']
          ],
        ],
      }
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
};

export default preview;
