import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    ag: ['#b1bac4', '#8b949e', '#6e7681', '#484f58', '#30363d', '#21262d', '#161b22', '#0d1117', '#010409']
  },
  colorScheme: 'dark',
  primaryColor: 'blue',
  primaryShade: 9,
  fontFamily: 'Roboto, sans-serif',
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
  headings: { fontFamily: 'Roboto' },
  focusRing: 'never',
}
// Customizations
// https://mantine.dev/theming/customization
// https://mantine.dev/theming/theming-context
// https://mantine.dev/theming/color-scheme

