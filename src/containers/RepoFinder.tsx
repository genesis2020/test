import React, { FC, useState, useMemo } from 'react'
import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import { SearchInput } from '../components/SearchInput'
import { Header } from '../components/Header'
import { Table } from '../components/Table'
import { usePagination } from '../hooks/usePaginationTable'
import { Loader } from '../components/Loader'

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

type TableHeadRow = {
	title: string
	field: string
	sorting?: boolean
	render?: (row: CreateDataReturn) => void
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
const tableHead: TableHeadRow[] = [
	{
		title: 'Avatar',
		field: 'avatar_url',
		sorting: false,
		render: (row) => <Avatar alt={row.login} src={row.avatar_url} />,
	},
	{ title: 'Login', field: 'login', sorting: false },
	{ title: 'Repository name', field: 'name', sorting: false },
	{ title: 'Description', field: 'description', sorting: false },
	{
		title: 'Link',
		field: 'html_url',
		sorting: false,
		render: (row) => (
			<Link href={row.html_url} target="_blank">
				{row.html_url}
			</Link>
		),
	},
	{
		title: 'Stars',
		field: 'stargazers_count',
	},
]

export const RepoFinder: FC = () => {
	const [repos, setRepos] = useState({})
	const { pageHandler, pages, tableData, loading, total } = usePagination(repos, setRepos)
	const tableRows = useMemo(
		() =>
			rows(tableData).map(
				({
					avatar_url,
					login,
					name,
					description,
					stargazers_count,
					html_url,
				}: CreateDataReturn) => ({
					avatar_url,
					login,
					name,
					description,
					html_url,
					stargazers_count,
				})
			),
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
