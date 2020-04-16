import React, { FC, useState, useMemo } from 'react'
import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import TableCell from '@material-ui/core/TableCell'
import Container from '@material-ui/core/Container'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import { SearchInput } from '../components/SearchInput'
import { Header } from '../components/Header'
import { Table } from '../components/Table'
import { usePagination } from '../hooks/usePaginationTable'
import { Loader } from '../components/Loader'

const StyledTableRow = styled(TableRow)`
	:nth-child(odd) {
		background-color: ${({ theme }) => theme.palette.background.default};
	}
`

const StyledTableCell = styled(TableCell)`
	max-width: 200px;
	word-break: break-all;
`

const StyledContainer = styled(Container)`
	height: 100%;
`

type CreateDataProps = {
	id: number
	name: string
	owner: {
		avatar_url: string
		login: string
	}
	html_url: string
	description: string
	stargazers_count: number
}

type CreateDataReturn = Pick<
	CreateDataProps,
	'id' | 'name' | 'stargazers_count' | 'html_url' | 'description'
> & {
	avatar_url: string
	login: string
}

const createData = ({
	id,
	name,
	owner: { avatar_url, login },
	html_url,
	description,
	stargazers_count,
}: CreateDataProps): CreateDataReturn => ({
	id,
	avatar_url,
	login,
	name,
	description,
	html_url,
	stargazers_count,
})

const rows = (tableData: any) => tableData.map(createData)
const tableHead = (
	<TableRow>
		<TableCell>Avatar</TableCell>
		<TableCell size="small" align="center">
			Login
		</TableCell>
		<TableCell size="small">Repository name</TableCell>
		<TableCell>Description</TableCell>
		<TableCell>Link</TableCell>
		<TableCell align="right">Stars</TableCell>
	</TableRow>
)

export const RepoFinder: FC = () => {
	const [repos, setRepos] = useState({})
	const { pageHandler, pages, tableData, loading, total } = usePagination(repos, setRepos)
	const tableRows = useMemo(
		() =>
			rows(tableData).map((row: CreateDataReturn) => (
				<StyledTableRow key={row.id}>
					<StyledTableCell>
						<Avatar alt={row.login} src={row.avatar_url} />
					</StyledTableCell>
					<StyledTableCell size="small" align="center">
						{row.login}
					</StyledTableCell>
					<StyledTableCell size="small">{row.name}</StyledTableCell>
					<StyledTableCell>{row.description}</StyledTableCell>
					<StyledTableCell>
						<Link href={row.html_url} target="_blank">
							{row.html_url}
						</Link>
					</StyledTableCell>
					<StyledTableCell align="right">{row.stargazers_count}</StyledTableCell>
				</StyledTableRow>
			)),
		[tableData]
	)

	return (
		<StyledContainer>
			<Header />
			<SearchInput pageHandler={pageHandler} placeholder="Enter repository name" />
			{loading && !tableRows.length && <Loader />}
			{!loading && (!!tableRows.length || total === 0) && (
				<Table tableHead={tableHead} tableRows={tableRows} pages={pages} total={total} />
			)}
		</StyledContainer>
	)
}
