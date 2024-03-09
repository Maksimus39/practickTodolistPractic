import {Button as MuiButton} from '@mui/material'

type ButtonPropsType = {
    title: string
    onClick?: () => void
    //className?: string
    color: 'inherit' | 'primary' | 'secondary'
    variant?: 'outlined' | 'text'
}

export const Button = ({
                           title,
                           onClick,
                           // className,
                           variant,
                           color
                       }: ButtonPropsType) => {
    return (
        <MuiButton onClick={onClick}
            // className={className}
                   variant={variant}
                   color={color}>{title}</MuiButton>
    )
}