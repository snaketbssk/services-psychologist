import * as React from 'react'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Container } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: `url(/header-big-builds.webp)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}))

// Assume you have a Logo component or an img element for your logo
const Logo = () => (
  <Image src='/propokot-main-logo-new.svg' width={270} height={196} alt='Logo' style={{ maxHeight: 160 }} />
)

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 160
  },
  display: 'flex',
  justifyContent: 'space-between'
}))

const HeaderMainWithoutControl = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position='static'>
        <Container maxWidth='lg'>
          <StyledToolbar>
            <Box></Box>
            <Link href='/'>
              <Logo />
            </Link>
            <Box></Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </Box>
  )
}

export default HeaderMainWithoutControl
