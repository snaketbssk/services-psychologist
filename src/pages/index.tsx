import BenefitsProfile from '@/components/book-consultation/BenefitsProfile'
import BenefitsSection from '@/components/book-consultation/BenefitsSection'
import BlogResources from '@/components/book-consultation/BlogResources'
import BookConsultation from '@/components/book-consultation/BookConsultation'
import CounselingServices from '@/components/book-consultation/CounselingServices'
import PsychologistProfile from '@/components/book-consultation/PsychologistProfile'
import TherapyProcess from '@/components/book-consultation/TherapyProcess'
import type { VideoPost } from '@/components/book-consultation/YoutubeViewer'
import YoutubeViewer from '@/components/book-consultation/YoutubeViewer'

import DocumentViewer from '@/components/book-consultation/DocumentViewer'
import { Box, Container } from '@mui/material'
import https from 'https'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BottomPopup from './bottom-popup'

// ─── Server-side fetch helper (bypasses self-signed cert on localhost) ────────

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { rejectUnauthorized: false }, res => {
      let raw = ''
      res.on('data', (chunk: string) => {
        raw += chunk
      })
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw) as T)
        } catch {
          reject(new Error(`Failed to parse JSON from ${url}`))
        }
      })
    })
    req.on('error', reject)
    req.end()
  })
}

// ─── API response shape ───────────────────────────────────────────────────────

interface ApiVideoItem {
  id: string
  day: string
  month: string
  category: string
  title: string
  videoId: string
}

interface ApiResponse {
  videos: {
    totalCount: number
    values: ApiVideoItem[]
  }
}

interface IProps {
  videos: VideoPost[]
  totalCount: number
}

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = ({ videos, totalCount }: IProps) => {
  return (
    <Box>
      <Container maxWidth='lg'>
        <Box sx={{ p: 2 }} />
        <BottomPopup />
        <Box sx={{ p: 2 }} />
        <BenefitsProfile />
        <Box sx={{ p: 2 }} />
        <PsychologistProfile />
        <Box sx={{ p: 2 }} />
        <BenefitsSection />
        <Box sx={{ p: 2 }} />
        <TherapyProcess />
        <Box sx={{ p: 2 }} />
        <CounselingServices />
        <Box sx={{ p: 2 }} />
        <BlogResources />
        <Box sx={{ p: 2 }} />

        {/* YoutubeViewer — fed from SSR API data */}
        <YoutubeViewer initialPosts={videos} totalCount={totalCount} />

        <Box sx={{ p: 2 }} />
        <BookConsultation />
        <Box sx={{ p: 2 }} />
        <DocumentViewer />
        <Box sx={{ p: 2 }} />
      </Container>
    </Box>
  )
}
//
// ─── SSR ──────────────────────────────────────────────────────────────────────

export const getServerSideProps: GetServerSideProps<IProps> = async (context: GetServerSidePropsContext) => {
  const i18nProps = await serverSideTranslations(context.locale ?? 'en')

  try {
    // new path
    const data = await fetchJson<ApiResponse>('https://snaketbs.com/psychologist/api/launch')

    // New shape: { videos: { totalCount, values: [...] } }
    const videos: VideoPost[] = (data.videos?.values ?? []).map(v => ({
      id: String(v.id),
      day: v.day,
      month: v.month,
      category: v.category ?? 'Shorts',
      title: v.title,
      videoId: v.videoId
    }))

    return {
      props: {
        ...i18nProps,
        videos,
        totalCount: data.videos?.totalCount ?? 0
      }
    }
  } catch (error) {
    console.error('[HomePage] Failed to fetch /api/launch:', error)

    return {
      props: {
        ...i18nProps,
        videos: [],
        totalCount: 0
      }
    }
  }
}

export default HomePage
