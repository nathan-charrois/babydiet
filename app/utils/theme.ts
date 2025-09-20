import { generateColors } from '@mantine/colors-generator'
import {
  type ButtonProps,
  type ChipProps,
  createTheme,
  type MantineTheme,
} from '@mantine/core'

import {
  blue,
  borderWidth,
  green,
  purple,
  yellow,
} from './colors'

export const themeBase = createTheme({
  fontFamily: 'Dongle, sans-serif',
  fontSizes: {
    xs: '24px',
    sm: '32px',
    md: '38px',
    lg: '48px',
    xl: '75px',
  },
  lineHeights: {
    xs: '0.75',
    sm: '1',
    md: '1.2',
    lg: '1.5',
    xl: '1.5',
  },
  components: {
    Title: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.brand[theme.other.typography],
          lineHeight: theme.lineHeights.xs,
        },
      }),
    },
    Text: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.brand[theme.other.typography],
          lineHeight: theme.lineHeights.sm,
        },
      }),
    },
    Button: {
      styles: (theme: MantineTheme, props: ButtonProps) => ({
        label: {
          overflow: 'visible',
        },
        root: props.size === 'xs'
          ? {
              padding: '3px 12px 1px',
              fontSize: theme.fontSizes.xs,
              color: theme.colors.brand[theme.other.typography],
              backgroundColor: 'transparent',
            }
          : {
              padding: '28px 18px 24px',
              fontSize: theme.fontSizes.md,
              color: theme.colors.brand[theme.other.buttonText],
              backgroundColor: theme.colors.accent[
                props.variant === 'primary'
                  ? theme.other.button
                  : theme.other.buttonSecondary
              ],
            },

      }),
    },
    Chip: {
      styles: (theme: MantineTheme, props: ChipProps) => ({
        iconWrapper: {
          display: 'none',
        },
        label: {
          fontSize: theme.fontSizes.md,
          color: props.checked
            ? theme.colors.accent[theme.other.buttonText]
            : theme.colors.brand[theme.other.typography],
          backgroundColor: props.checked
            ? theme.colors.accent[theme.other.button]
            : 'transparent',
        },
      }),
    },
    Switch: {
      styles: (theme: MantineTheme) => ({
        track: {
          backgroundColor: theme.colors.brand[theme.other.surface],
          borderColor: theme.colors.brand[theme.other.typography],
        },
        thumb: {
          borderColor: theme.colors.brand[theme.other.typography],
          backgroundColor: theme.colors.brand[theme.other.typography],
        },
      }),
    },
    Slider: {
      styles: (theme: MantineTheme) => ({
        bar: {
          backgroundColor: theme.colors.complement[2],
        },
        track: {
          backgroundColor: theme.colors.complement[2],
        },
        mark: {
          backgroundColor: theme.colors.complement[2],
          borderColor: theme.colors.complement[2],
        },
        thumb: {
          borderColor: theme.colors.brand[6],
          borderWidth: borderWidth,
        },
      }),
    },
    ActionIcon: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.brand[theme.other.typography],
        },
      }),
    },
    Checkbox: {
      styles: (theme: MantineTheme) => ({
        description: {
          lineHeight: theme.lineHeights.xs,
        },
      }),
    },
  },
})

export const russianOverrides = createTheme({
  fontSizes: {
    xs: '18px',
    sm: '20px',
    md: '22px',
    lg: '40px',
    xl: '62px',
  },
})

export const themeBaby = createTheme({
  colors: {
    brand: generateColors(yellow),
    accent: generateColors(green),
    complement: generateColors(blue),
  },
  primaryColor: 'brand',
  other: {
    surface: 0,
    typography: 7,
    button: 6,
    buttonText: 0,
    buttonSecondary: 3,
  },
  components: {
    AppShell: {
      classNames: {
        root: 'background-theme baby',
        footer: 'background-theme baby',
      },
    },
  },
})

export const themeMommy = createTheme({
  colors: {
    brand: generateColors(purple),
    accent: generateColors(purple),
    complement: generateColors(purple),
  },
  primaryColor: 'brand',
  other: {
    surface: 5,
    typography: 0,
    button: 8,
    buttonText: 0,
    buttonSecondary: 4,
  },
  components: {
    AppShell: {
      classNames: {
        root: 'background-theme mommy',
        footer: 'background-theme mommy',
      },
    },
  },
})
