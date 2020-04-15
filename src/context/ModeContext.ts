import { createContext } from 'react'
import noop from 'lodash/noop'

export const ModeContext = createContext({
	toggleMode: noop,
})
