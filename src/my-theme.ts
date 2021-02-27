// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  fonts: {
    primary: 'Helvetica Neue'
  },

  colors: {
    main: 'cyan',
    lightGrey: '#ECEDEF',
    midGrey: '#DFE0E3',
    darkGrey: '#707070',
    blue: '#6CA3B8',
    pink: '#EA81DA',
    gradient: 'linear-gradient(135deg, rgba(234,129,218,1) 0%, rgba(98,165,181,1) 100%)',
  },
} as const;

export { myTheme };