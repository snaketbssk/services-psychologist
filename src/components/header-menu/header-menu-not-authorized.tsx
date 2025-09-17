import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import { useRouter } from 'next/router'

const HeaderMenuNotAuthorized = () => {
  const theme = useTheme()
  const router = useRouter()

  const handleLogin = () => {
    router.replace('/login')
  }

  return (
    <IconButton size='large' aria-label='display more actions' edge='end' color='inherit' onClick={handleLogin}>
      <LoginIcon sx={{ color: theme.palette.primary.main }} />
    </IconButton>
  )
}

export default HeaderMenuNotAuthorized
