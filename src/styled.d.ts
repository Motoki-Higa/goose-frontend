// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		fonts: {
			primary: string;
		};

		colors: {
			main: string;
			lightGrey: string;
			midGrey: string;
			darkGrey: string;
			gradient: string;
		};
	}
}