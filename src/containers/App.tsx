import React, { FC } from 'react'
import { ToggleMode } from '../components/ToggleMode'
import { RepoFinder } from './RepoFinder'
import { InfoPopup } from '../components/InfoPopup'

export const App: FC = () => (
	<>
		<InfoPopup />
		<ToggleMode />
		<RepoFinder />
	</>
)
