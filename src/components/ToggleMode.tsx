import React, { FC, useContext, useMemo } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import { ModeContext } from '../context/ModeContext'

const StyledIconButton = styled(IconButton)`
	position: fixed;
	right: 0;
	top: 0;
`

export const ToggleMode: FC = () => {
	const { palette } = useTheme()
	const { toggleMode } = useContext(ModeContext)
	const modeButton = useMemo(
		() => (
			<StyledIconButton onClick={toggleMode} color="primary">
				{palette.type === 'light' ? <Brightness2OutlinedIcon /> : <Brightness5Icon />}
			</StyledIconButton>
		),
		[palette.type, toggleMode]
	)

	return <Box>{modeButton}</Box>
}
