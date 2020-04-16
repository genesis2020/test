import React, { useState, useCallback, useMemo, ReactElement, useContext } from 'react'
import parseLinkHeader from 'parse-link-header'
import debounce from 'lodash/debounce'
import parse from 'parse-link-header'
import { useHttp } from './useHttp'
import { InfoPopupContext } from '../context/InfoPopupContext'

export type UsePaginationReturn = {
	pageHandler: (url: string, value?: string) => void
	loading: boolean
	pages: ReactElement[] | []
	tableData: any[]
	total: number
}

export type EntitiesType = {
	[value: string]: {
		[page: string]: {
			data: { total_count: number; incomplete_results: boolean; items: any }
			links: parseLinkHeader.Links
		}
	}
}

export const usePagination = (
	entity: EntitiesType,
	setEntity: (_: any) => void
): UsePaginationReturn => {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchValue, setSearchValue] = useState('')
	const [timer, setTimer] = useState(500)
	const { setInfoPopupStatus } = useContext(InfoPopupContext)
	const { loading, request } = useHttp()

	const pageHandler = useCallback(
		debounce(async (url: string, value?: string) => {
			if (value === '') {
				setSearchValue(value)
				return
			}

			const nextPage = +url.split('&page=')[1] || 1
			let data
			const inputValue = value || searchValue
			if (value) setSearchValue(value)
			setCurrentPage(nextPage)

			try {
				if (!entity?.[inputValue]?.[nextPage]) {
					const response = await request(url)
					data = await response.json().then((data) => ({
						data,
						links: parse(response.headers.get('link') as string) || {},
					}))
				} else {
					data = entity[inputValue][nextPage]
				}
			} catch (e) {
				setInfoPopupStatus({ isOpen: true, message: e.message, severity: 'error' })
			}

			setEntity({
				...entity,
				[inputValue]: {
					...entity[inputValue],
					[nextPage]: data,
				},
			})
		}, timer),
		[entity, request, searchValue, setEntity]
	)

	const onClickHandler = useCallback(
		(url: string) => {
			setTimer(0)
			pageHandler(url)
		},
		[pageHandler]
	)

	const pages = useMemo(
		() =>
			Object.entries(entity?.[searchValue]?.[currentPage]?.links ?? {}).map(([key, value]: any) => (
				<button key={key} onClick={() => onClickHandler(value.url)}>
					{key}
				</button>
			)),
		[currentPage, entity, onClickHandler, searchValue]
	)

	const tableData = useMemo(() => entity?.[searchValue]?.[currentPage]?.data?.items ?? [], [
		currentPage,
		entity,
		searchValue,
	])

	const total = useMemo(() => entity?.[searchValue]?.[currentPage]?.data?.total_count ?? null, [
		currentPage,
		entity,
		searchValue,
	])

	return {
		pageHandler,
		loading,
		pages,
		tableData,
		total,
	}
}
