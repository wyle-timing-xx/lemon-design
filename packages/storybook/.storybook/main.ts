import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        target: 'esnext',
        rollupOptions: {
          onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
                warning.message.includes('use client')) {
              return;
            }
            warn(warning);
          },
        },
      },
      resolve: {
        alias: {
          '@lemon-design-xx/core': path.resolve(__dirname, '../../core/src/index.ts'),
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          target: 'esnext',
          supported: {
            'top-level-await': true,
          },
        },
      },
    });
  },
};

export default config;
