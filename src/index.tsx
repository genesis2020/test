import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ModeContext } from './context/ModeContext'
import { App } from './containers/App'
import { InfoPopupContext } from './context/InfoPopupContext'
import { useInfoPopup } from './hooks/useInfoPopup'
import { useMaterialTheme } from './hooks/useMaterialTheme'
import './index.css'

const Main = () => {
	const { infoPopupStatus, setInfoPopupStatus } = useInfoPopup()
	const { MuiTheme, toggleMode } = useMaterialTheme()

	return (
		<ThemeProvider theme={MuiTheme}>
			<StyledThemeProvider theme={MuiTheme}>
				<CssBaseline />
				<StylesProvider injectFirst>
					<ModeContext.Provider value={{ toggleMode }}>
						<InfoPopupContext.Provider value={{ infoPopupStatus, setInfoPopupStatus }}>
							<App />
						</InfoPopupContext.Provider>
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
