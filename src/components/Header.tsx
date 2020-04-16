import React, { FC } from 'react'
import { Box } from '@material-ui/core'
import styled from 'styled-components'

const HeaderStyles = styled(Box)`
	padding: ${({ theme }) => theme.spacing(7, 0)};
	text-align: center;
	font-size: ${({ theme }) => theme.spacing(2.5)}px;
`

export const Header: FC = () => <HeaderStyles>Github repository finder</HeaderStyles>
