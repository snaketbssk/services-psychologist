// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import HeaderSecondary from '../header/header-secondary'
import Footer from '../footer'
import { Container } from '@mui/material'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  //height: '80vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    //minHeight: '80vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    //minHeight: '80vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const LayoutSecondary = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <HeaderSecondary />
      <Box className='app-content' sx={{ overflowX: 'hidden', position: 'relative' }}>
        <Container maxWidth='lg'>{children}</Container>
        <Box p={2} />
      </Box>
      <Footer />
    </BlankLayoutWrapper>
  )
}

export default LayoutSecondary
