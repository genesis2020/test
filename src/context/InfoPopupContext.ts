import { createContext, Dispatch, SetStateAction } from 'react'
import { AlertProps } from '@material-ui/lab/Alert'
import noop from 'lodash/noop'

type InfoPopupStatus = { isOpen: boolean; message: string; severity: AlertProps['severity'] }

export type InfoPopupContextType = {
	infoPopupStatus: InfoPopupStatus
	setInfoPopupStatus: Dispatch<SetStateAction<InfoPopupStatus>>
}

export const InfoPopupContext = createContext({
	infoPopupStatus: { isOpen: false, message: '', severity: 'error' },
	setInfoPopupStatus: noop,
} as InfoPopupContextType)
