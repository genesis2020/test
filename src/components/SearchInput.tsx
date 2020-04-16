import React, { useCallback, useState, FC } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { InputAdornment } from '@material-ui/core'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

const SearchField = styled(TextField)`
	width: 100%;
	padding: ${({ theme }) => theme.spacing(7, 0)};
`

type SearchInputProps = {
	pageHandler: (url: string, inputValue: string) => void
	placeholder: string
}

export const SearchInput: FC<SearchInputProps> = ({ pageHandler, placeholder }) => {
	const [value, setValue] = useState('')
	const onChange = useCallback(
		async (e) => {
			const inputValue = e.target.value
			setValue(inputValue)
			const url = `https://api.github.com/search/repositories?q=${inputValue}&&per_page=30`
			pageHandler(url, inputValue)
		},
		[pageHandler, setValue]
	)

	return (
		<SearchField
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchRoundedIcon />
					</InputAdornment>
				),
			}}
		/>
	)
}
