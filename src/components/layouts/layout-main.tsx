// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Types
import { Container } from '@mui/material'
import SiteHeader from '../book-consultation/SiteHeader'
import Footer from '../footer'
import { BlankLayoutProps } from './types'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({}) => ({
  //height: '80vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    //minHeight: '80vh',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    //minHeight: '80vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const LayoutMain = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <SiteHeader />
      {/* <HeaderMain /> */}
      <Box className='app-content' sx={{ overflowX: 'hidden', position: 'relative' }}>
        <Container maxWidth='lg'>{children}</Container>
      </Box>
      <Footer />
    </BlankLayoutWrapper>
  )
}

export default LayoutMain
