import React, { FC } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

const StyledBox = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ theme }) => `${theme.spacing(3)}px`};
	padding-top: ${({ theme }) => `${theme.spacing(5)}px`};
`

export const EmptyData: FC = () => <StyledBox>No data found</StyledBox>
