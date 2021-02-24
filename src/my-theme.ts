// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
    colors: {
        main: 'cyan',
        secondary: 'magenta',
    },
} as const;

export { myTheme };