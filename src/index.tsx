import React, { useState, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { App } from './components/App'
import { ModeContext } from './context/ModeContext'

const Main = () => {
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark')
	const MuiTheme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: themeMode,
					primary: {
						main: themeMode === 'dark' ? '#EEE' : '#111',
					},
					background: {
						default: themeMode === 'dark' ? '#111' : '#EEE',
					},
				},
				spacing: 8,
			}),
		[themeMode]
	)

	const toggleMode = useCallback(() => {
		const newTheme = themeMode === 'dark' ? 'light' : 'dark'
		setThemeMode(newTheme)
	}, [themeMode])

	return (
		<ThemeProvider theme={MuiTheme}>
			<StyledThemeProvider theme={MuiTheme}>
				<CssBaseline />
				<StylesProvider injectFirst>
					<ModeContext.Provider value={{ toggleMode }}>
						<App />
					</ModeContext.Provider>
				</StylesProvider>
			</StyledThemeProvider>
		</ThemeProvider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
	document.getElementById('root')
)
