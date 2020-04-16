import React, { FC } from 'react'
import { ToggleMode } from '../components/ToggleMode'
import { RepoFinder } from './RepoFinder'

export const App: FC = () => (
	<>
		<ToggleMode />
		<RepoFinder />
	</>
)
