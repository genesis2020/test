import React, { FC, ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import noop from 'lodash/noop'
import MaterialTable from 'material-table'
import { fade } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import { UsePaginationReturn } from '../hooks/usePaginationTable'
import { EmptyData } from './EmptyData'
import {
	PAGE_ICONS,
	PAGE_TOOLTIPS,
	PAGES_ORDER,
	PageNameType,
	ITEMS_PER_PAGE,
} from '../common/const'

const StyledPaper = styled(Paper)`
	border: 1px solid ${({ theme }) => fade(theme.palette.primary.main, 0.5)};
`

const CurrentPage = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.palette.secondary.main};
	padding: ${({ theme }) => theme.spacing(1, 3)};
`

type TableProps = Pick<UsePaginationReturn, 'pages' | 'total'> & {
	tableRows: ReactElement[]
	tableHead: any[]
	currentPage: number
}

const defaultPage = (page: PageNameType) => ({
	icon: PAGE_ICONS[page],
	tooltip: PAGE_TOOLTIPS[page],
	disabled: true,
	isFreeAction: true,
	onClick: noop,
})

export const Table: FC<TableProps> = ({ tableRows, tableHead, pages, currentPage, total }) => {
	const pageActions = useMemo(
		() => PAGES_ORDER.map((page: PageNameType) => pages[page] || defaultPage(page)),
		[pages]
	)

	const currentPageInfo = useMemo(() => {
		const from = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1
		const to =
			currentPage === 1 ? tableRows.length : (currentPage - 1) * ITEMS_PER_PAGE + tableRows.length
		return `Page ${currentPage}: Items ${from} - ${to}`
	}, [currentPage, tableRows.length])

	return (
		<>
			{total !== 0 ? (
				<TableContainer component={StyledPaper}>
					<CurrentPage>
						<Box>Search results:</Box>
						<Box>{currentPageInfo}</Box>
					</CurrentPage>
					<MaterialTable
						columns={tableHead}
						data={tableRows}
						options={{
							search: false,
							draggable: false,
							showTitle: false,
							paging: false,
						}}
						actions={pageActions}
					/>
				</TableContainer>
			) : (
				<EmptyData />
			)}
		</>
	)
}
