import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-designs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  features: { componentsManifest: true },
  core: { disableTelemetry: true },
};
export default config;
