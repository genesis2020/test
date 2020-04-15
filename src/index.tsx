import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { App } from './components/App'
import { GlobalStyle, defaultTheme } from './theme'
import { ModeContext } from './context/ModeContext'

const Main = () => {
	const [theme, setTheme] = useState(defaultTheme)

	const toggleMode = useCallback(() => {
		const newTheme = theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' }
		setTheme(newTheme)
	}, [theme.mode])

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<ModeContext.Provider value={{ toggleMode }}>
				<App />
			</ModeContext.Provider>
		</ThemeProvider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
	document.getElementById('root')
)
