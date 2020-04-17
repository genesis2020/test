import React, { FC, ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import noop from 'lodash/noop'
import MaterialTable from 'material-table'
import { fade } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import { UsePaginationReturn } from '../hooks/usePaginationTable'
import { EmptyData } from './EmptyData'
import { PAGE_ICONS, PAGE_TOOLTIPS, PAGES_ORDER, PageNameType } from '../common/const'

const StyledPaper = styled(Paper)`
	border: 1px solid ${({ theme }) => fade(theme.palette.primary.main, 0.5)};
`

type TableProps = Pick<UsePaginationReturn, 'pages' | 'total'> & {
	tableRows: ReactElement[]
	tableHead: any[]
}

const defaultPage = (page: PageNameType) => ({
	icon: PAGE_ICONS[page],
	tooltip: PAGE_TOOLTIPS[page],
	disabled: true,
	isFreeAction: true,
	onClick: noop,
})

export const Table: FC<TableProps> = ({ tableRows, tableHead, pages, total }) => {
	const pageActions = useMemo(
		() => PAGES_ORDER.map((page: PageNameType) => pages[page] || defaultPage(page)),
		[pages]
	)

	return (
		<>
			{total !== 0 ? (
				<TableContainer component={StyledPaper}>
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
