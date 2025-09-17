// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import HeaderMainWithoutControl from '../header/header-main-without-control'
import Footer from '../footer'

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

const LayoutMainWithoutControl = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <HeaderMainWithoutControl />
      <Box className='app-content' sx={{ overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
      <Footer />
    </BlankLayoutWrapper>
  )
}

export default LayoutMainWithoutControl
