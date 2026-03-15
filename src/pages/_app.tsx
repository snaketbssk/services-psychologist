import LayoutMain from '@/components/layouts/layout-main'
import ThemeProvider from '@/theme'
import { createEmotionCache } from '@/utils/create-emotion-cache'
import { EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import 'reflect-metadata'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const queryClient = new QueryClient()
const clientSideEmotionCache = createEmotionCache()

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout = Component.getLayout ?? (page => <LayoutMain>{page}</LayoutMain>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? false
  const guestGuard = Component.guestGuard ?? false
  const claims = Component.claims ?? []

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
