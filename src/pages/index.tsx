import { useColorMode } from '@/theme'
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BottomPopup from './bottom-popup'
import PopupCarousel from './popup-carousel'

interface IProps {}

const HomePage = () => {
  const { toggleColorMode, mode } = useColorMode()
  const { t } = useTranslation()

  return (
    <Box>
      <Container maxWidth='lg'>
        Hello Olya
        <Button variant='text'>Text</Button>
        <Button variant='contained'>Contained</Button>
        <Button variant='outlined'>Outlined</Button>
        <Button color='secondary'>Secondary</Button>
        {t('BREADCRUMBS.REAL_ESTATE_PAGE')}
        <Button variant='contained' color='success'>
          Success
        </Button>
        <Button variant='outlined' color='error'>
          Error
        </Button>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label='Label' />
          <FormControlLabel required control={<Checkbox />} label='Required' />
          <FormControlLabel disabled control={<Checkbox />} label='Disabled' />
        </FormGroup>
        {/* <TestPage />
        <TestPage />
        <TestPage /> */}
        <PopupCarousel />
        <BottomPopup />
        <Button onClick={toggleColorMode}>Switch to {mode === 'light' ? 'dark' : 'light'}</Button>
      </Container>
    </Box>
  )

  //return <Spinner />
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en'))
      }
    }
  } catch (error: any) {
    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en'))
      }
    }
  }
}

//HomePage.getLayout = (page: ReactNode) => <LayoutMainWallpaper>{page}</LayoutMainWallpaper>

export default HomePage
