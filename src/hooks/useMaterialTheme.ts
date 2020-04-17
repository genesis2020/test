import { useMemo, useState, useCallback } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'

export const useMaterialTheme = () => {
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark')

	const MuiTheme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: themeMode,
					primary: {
						main: themeMode === 'dark' ? '#EEE' : '#111',
					},
					secondary: {
						main: themeMode === 'dark' ? '#112' : '#BEF',
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

	return {
		MuiTheme,
		toggleMode,
	}
}
