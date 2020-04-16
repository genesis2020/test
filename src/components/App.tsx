import React, { FC } from 'react'
import Container from '@material-ui/core/Container'
import { SearchInput } from './SearchInput'
import { ToggleMode } from './ToggleMode'
import { Header } from './Header'
import { Table } from './Table'

export const App: FC = () => {
	return (
		<>
			<ToggleMode />
			<Container>
				<Header />
				<SearchInput />
				<Table />
			</Container>
		</>
	)
}
