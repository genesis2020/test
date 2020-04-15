import React, { FC, useContext, useMemo } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import styled, { ThemeContext } from 'styled-components'
import { ModeContext } from '../context/ModeContext'

const StyledIconButton = styled(IconButton)`
	&& {
		position: fixed;
		right: 0;
		top: 0;
	}
`

export const ToggleMode: FC = () => {
	const { mode } = useContext(ThemeContext)
	const { toggleMode } = useContext(ModeContext)
	const icon = useMemo(
		() => (mode === 'light' ? <Brightness2OutlinedIcon /> : <Brightness5Icon />),
		[mode]
	)

	return (
		<StyledIconButton onClick={toggleMode} color="secondary">
			{icon}
		</StyledIconButton>
	)
}
