import { useState } from 'react'
import { InfoPopupContextType } from './../context/InfoPopupContext'

export const useInfoPopup = () => {
	const [infoPopupStatus, setInfoPopupStatus] = useState<InfoPopupContextType['infoPopupStatus']>({
		isOpen: false,
		message: '',
		severity: 'error',
	})

	return {
		infoPopupStatus,
		setInfoPopupStatus,
	}
}
