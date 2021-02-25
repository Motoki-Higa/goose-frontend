// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
    fonts: {
        primary: 'Helvetica Neue'
    },

    colors: {
        main: 'cyan',
        secondary: 'magenta',
        gradient: 'linear-gradient(135deg, rgba(234,129,218,1) 0%, rgba(98,165,181,1) 100%)',
    },
} as const;

export { myTheme };