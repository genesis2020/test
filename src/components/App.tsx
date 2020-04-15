import React, { FC } from 'react'
import Container from '@material-ui/core/Container'
import { SearchInput } from './SearchInput'
import { ToggleMode } from './ToggleMode'

export const App: FC = () => {
	return (
		<>
			<ToggleMode />
			<Container>
				<SearchInput />
			</Container>
		</>
	)
}
