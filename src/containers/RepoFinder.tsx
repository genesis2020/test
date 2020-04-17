import React, { FC, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import truncate from 'lodash/truncate'
import { useTheme, Theme } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import { Column } from 'material-table'
import { SearchInput } from '../components/SearchInput'
import { Header } from '../components/Header'
import { Table } from '../components/Table'
import { usePagination } from '../hooks/usePaginationTable'
import { Loader } from '../components/Loader'
import { ITEMS_PER_PAGE, TRUNCATE_OPTIONS } from '../common/const'

const StyledContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	padding-bottom: ${({ theme }) => theme.spacing(7)}px;
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
	login: truncate(login, TRUNCATE_OPTIONS),
	name: truncate(name, TRUNCATE_OPTIONS),
	description: truncate(description, TRUNCATE_OPTIONS),
	html_url,
	stargazers_count,
})

type TableHeadGeneratorType = (theme: Theme) => Column<CreateDataReturn>[]

const rows = (tableData: any) => tableData.map(createData)
const tableHeadGenerator: TableHeadGeneratorType = (theme) => {
	return [
		{
			title: 'Avatar',
			field: 'avatar_url',
			width: '10%',
			sorting: false,
			headerStyle: {
				backgroundColor: theme.palette.secondary.main,
			},
			render: (row) => <Avatar alt={row.login} src={row.avatar_url} />,
		},
		{
			title: 'Login',
			field: 'login',
			width: '15%',
			sorting: false,
			cellStyle: { wordBreak: 'break-all' },
			headerStyle: {
				backgroundColor: theme.palette.secondary.main,
			},
		},
		{
			title: 'Repository name',
			field: 'name',
			width: '15%',
			sorting: false,
			cellStyle: { wordBreak: 'break-all' },
			headerStyle: {
				backgroundColor: theme.palette.secondary.main,
			},
		},
		{
			title: 'Description',
			field: 'description',
			width: '25%',
			sorting: false,
			cellStyle: { wordBreak: 'break-all' },
			headerStyle: {
				backgroundColor: theme.palette.secondary.main,
			},
		},
		{
			title: 'Link',
			field: 'html_url',
			width: '25%',
			sorting: false,
			headerStyle: {
				backgroundColor: theme.palette.secondary.main,
			},
			cellStyle: { wordBreak: 'break-all' },
			render: (row) => (
				<Link href={row.html_url} target="_blank">
					{row.html_url}
				</Link>
			),
		},
		{
			title: 'Stars',
			field: 'stargazers_count',
			width: '10%',
			headerStyle: {
				textAlign: 'right',
				backgroundColor: theme.palette.secondary.main,
			},
			cellStyle: { textAlign: 'right', wordBreak: 'break-all' },
		},
	]
}

export const RepoFinder: FC = () => {
	const [repos, setRepos] = useState({})
	const theme = useTheme()
	const tableHead = tableHeadGenerator(theme)
	const { pageHandler, pages, tableData, loading, total, currentPage } = usePagination(
		repos,
		setRepos
	)
	const reposUrl = useCallback(
		(inputValue: string) =>
			`https://api.github.com/search/repositories?q=${inputValue}&&per_page=${ITEMS_PER_PAGE}&&sort=stars`,
		[]
	)
	const tableRows = useMemo(() => rows(tableData), [tableData])

	return (
		<StyledContainer>
			<Header />
			<SearchInput
				pageHandler={pageHandler}
				placeholder="Enter repository name"
				getUrl={reposUrl}
			/>
			{loading && !tableRows.length && <Loader />}
			{!loading && (!!tableRows.length || total === 0) && (
				<Table
					tableHead={tableHead}
					tableRows={tableRows}
					pages={pages}
					total={total}
					currentPage={currentPage}
				/>
			)}
		</StyledContainer>
	)
}
