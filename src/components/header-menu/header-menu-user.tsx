import AccountCircle from '@mui/icons-material/AccountCircle'
import { Divider, Menu, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useState } from 'react'
import HeaderMenuUserLogoutItem from './header-menu-logout-item'
import HeaderMenuUserItems from './header-menu-user-items'

const HeaderMenuUser = () => {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSelect = (value: string) => {
    handleClose()
    router.replace(value)
  }

  const handleLogout = () => {
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton size='large' aria-label='display more actions' edge='end' color='inherit' onClick={handleMenu}>
        <AccountCircle sx={{ color: theme.palette.primary.main }} />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <HeaderMenuUserItems handleSelect={handleSelect} />
        <Divider />
        <HeaderMenuUserLogoutItem handleLogout={handleLogout} />
      </Menu>
    </Box>
  )
}

export default HeaderMenuUser
