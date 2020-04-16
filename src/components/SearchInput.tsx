import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { InputAdornment } from '@material-ui/core'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

const SearchField = styled(TextField)`
	width: 100%;
	padding: ${({ theme }) => theme.spacing(7, 0)};
`

export const SearchInput = () => (
	<SearchField
		id="search"
		placeholder="Enter repository name..."
		InputProps={{
			startAdornment: (
				<InputAdornment position="start">
					<SearchRoundedIcon />
				</InputAdornment>
			),
		}}
	/>
)
