'use client'

import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid' // ✅ FIX: Correct Grid import
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[400]),
        p: 6
      }}
      component='footer'
    >
      <Container maxWidth='md'>
        <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image src='/propokot-linear-logo-new.svg' alt='' width={160} height={128} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography>
              {t('FOOTER.TITLE')}{' '}
              <Link href='/' style={{ textDecoration: 'underline', color: theme.palette.grey[600] }}>
                {t('FOOTER.LICENSE_TITLE')} {t('FOOTER.POLITICS_TITLE')}
              </Link>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
              <Grid size={{ xs: 6 }}>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('MENU.BUY')}
                  </Link>
                </Typography>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('MENU.SELL')}
                  </Link>
                </Typography>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('MENU.REST')}
                  </Link>
                </Typography>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('MENU.ON_MAP')}
                  </Link>
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('MENU.ADS_ON_SITE')}
                  </Link>
                </Typography>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('USER.REGISTRATION.TITLE')}
                  </Link>
                </Typography>
                <Typography>
                  <Link href='/' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('USER.LOGIN.TITLE')}
                  </Link>
                </Typography>
                <Typography>
                  <Link href='/about' style={{ textDecoration: 'none', color: theme.palette.grey[100] }}>
                    {t('MENU.ABOUT')}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
