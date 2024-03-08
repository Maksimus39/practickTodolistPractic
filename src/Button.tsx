import {Button as MuiButton} from '@mui/material'

type ButtonPropsType = {
    title: string
    onClick?: () => void
    className?: string
    color: 'inherit' | 'primary' | 'secondary'
}

export const Button = ({title, onClick, className, color}: ButtonPropsType) => {
    return (
        <MuiButton onClick={onClick} className={className} color={color}>{title}</MuiButton>
    )
}