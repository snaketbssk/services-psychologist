import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Container } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderMenu from '../header-menu/header-menu'

const StyledAppBar = styled(AppBar)(({ theme }) => ({}))

const Logo = () => (
  <Image
    src='/header-mini-logo-new.svg'
    width={270}
    height={60}
    alt='Logo'
    style={{ maxHeight: 60, position: 'relative', top: 8 }}
  />
)

const Background = () => (
  <Image
    src='/header-mini-builds.jpg'
    width={400}
    height={60}
    alt='Logo'
    style={{ maxHeight: 60, position: 'relative', top: 8 }}
  />
)

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 60
  },
  display: 'flex',
  justifyContent: 'space-between'
}))

const HeaderSecondary = () => {
  const router = useRouter()
  const theme = useTheme()

  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Set a threshold width for including the Background component
  const thresholdWidth = 870 // Adjust this value as needed

  const handleLogin = () => {
    router.replace('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position='static'>
        <Container maxWidth='lg'>
          <StyledToolbar>
            <Link href='/'>
              <Logo />
            </Link>
            {windowWidth > thresholdWidth && <Background />}
            <Box>
              <HeaderMenu />
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </Box>
  )
}

export default HeaderSecondary
