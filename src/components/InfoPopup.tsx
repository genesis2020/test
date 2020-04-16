import React, { FC, useContext } from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { InfoPopupContext } from '../context/InfoPopupContext'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const InfoPopup: FC = () => {
	const { infoPopupStatus, setInfoPopupStatus } = useContext(InfoPopupContext)

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setInfoPopupStatus({ ...infoPopupStatus, isOpen: false })
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={infoPopupStatus.isOpen}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert onClick={handleClose} severity={infoPopupStatus.severity}>
				{infoPopupStatus.message}
			</Alert>
		</Snackbar>
	)
}
