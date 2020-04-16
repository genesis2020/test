import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'
import { Table as MTable, fade } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import { UsePaginationReturn } from '../hooks/usePaginationTable'
import { EmptyData } from './EmptyData'

const StyledPaper = styled(Paper)`
	border: 1px solid ${({ theme }) => fade(theme.palette.primary.main, 0.5)};
`

type TableProps = Pick<UsePaginationReturn, 'pages' | 'total'> & {
	tableRows: ReactElement[]
	tableHead: ReactElement
}

export const Table: FC<TableProps> = ({ tableRows, tableHead, pages, total }) => (
	<>
		{total !== 0 ? (
			<TableContainer component={StyledPaper}>
				<MTable>
					<TableHead>{tableHead}</TableHead>
					<TableBody>{tableRows}</TableBody>
				</MTable>
			</TableContainer>
		) : (
			<EmptyData />
		)}
	</>
)
