import React, { FC } from 'react'
import { Table as MTable, fade } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
	border: 1px solid ${({ theme }) => fade(theme.palette.primary.main, 0.5)};
`

const StyledTableRow = styled(TableRow)`
	:nth-child(odd) {
		background-color: ${({ theme }) => theme.palette.background.default};
	}
`

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	return { name, calories, fat, carbs, protein }
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export const Table: FC = () => {
	return (
		<TableContainer component={StyledPaper}>
			<MTable>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.name}>
							<TableCell scope="row">{row.name}</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">{row.carbs}</TableCell>
							<TableCell align="right">{row.protein}</TableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</MTable>
		</TableContainer>
	)
}
