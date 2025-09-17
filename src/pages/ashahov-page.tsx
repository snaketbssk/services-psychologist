import LayoutMainWallpaper from '@/components/layouts/layout-main-wallpaper'
import { Box, Container, Divider, List, ListItem, Typography } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {}

const AshahovPage = () => {
  const { t } = useTranslation()

  // Safe helper to render lists
  const renderList = (items: unknown) => {
    const list = Array.isArray(items) ? items : []
    return list.map((item, idx) => (
      <ListItem key={idx} sx={{ pl: 0, mb: 1 }}>
        • {item}
      </ListItem>
    ))
  }

  return (
    <Container maxWidth='md'>
      {/* HEADER */}
      {/* <Box mb={4}>
        <Typography variant='subtitle1'>{t('HEADER.SUBTITLE')}</Typography>
      </Box> */}

      {/* ACHIEVEMENTS */}
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>
          {t('ACHIEVEMENTS.TITLE')}
        </Typography>
        <List dense>{renderList(t('ACHIEVEMENTS.ITEMS', { returnObjects: true }))}</List>
      </Box>

      {/* MISSION */}
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>
          {t('MISSION.TITLE')}
        </Typography>
        <Typography fontStyle='italic'>{t('MISSION.TEXT')}</Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* BIOGRAPHY */}
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>
          {t('BIOGRAPHY.TITLE')}
        </Typography>
        <List dense>{renderList(t('BIOGRAPHY.ITEMS', { returnObjects: true }))}</List>
      </Box>

      {/* METHODOLOGY */}
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>
          {t('METHODOLOGY.TITLE')}
        </Typography>
        {renderList(t('METHODOLOGY.ITEMS', { returnObjects: true }))}
      </Box>

      {/* PERSONAL INTERESTS */}
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>
          {t('PERSONAL_INTERESTS.TITLE')}
        </Typography>
        <List dense>{renderList(t('PERSONAL_INTERESTS.ITEMS', { returnObjects: true }))}</List>
      </Box>

      {/* PHILOSOPHY */}
      <Box mb={4}>
        <Typography variant='h5' gutterBottom>
          {t('PHILOSOPHY.TITLE')}
        </Typography>
        <Typography paragraph>{t('PHILOSOPHY.TEXT')}</Typography>
      </Box>
    </Container>
  )
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

AshahovPage.getLayout = (page: ReactNode) => <LayoutMainWallpaper>{page}</LayoutMainWallpaper>

export default AshahovPage
