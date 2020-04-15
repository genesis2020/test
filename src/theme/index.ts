import { DefaultTheme, createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	body {
		background-color: ${(props) => (props.theme.mode === 'dark' ? '#111' : '#EEE')};
        color: ${(props) => (props.theme.mode === 'dark' ? '#EEE' : '#111')};
        margin: 0;
	}
`

export const defaultTheme: DefaultTheme = {
	mode: 'light',
}
