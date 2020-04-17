export const DEBOUNCE_TIMER = 500

export type PageIconsType = 'chevron_right' | 'chevron_left' | 'last_page' | 'first_page'

export const PAGE_ICONS: { [key: string]: PageIconsType } = {
	next: 'chevron_right',
	prev: 'chevron_left',
	last: 'last_page',
	first: 'first_page',
}

export type PageTooltipsType = 'Next Page' | 'Previous Page' | 'Last Page' | 'First Page'

export const PAGE_TOOLTIPS: { [key: string]: PageTooltipsType } = {
	next: 'Next Page',
	prev: 'Previous Page',
	last: 'Last Page',
	first: 'First Page',
}

export type PageNameType = 'first' | 'prev' | 'next' | 'last'

export const PAGES_ORDER: PageNameType[] = ['first', 'prev', 'next', 'last']
