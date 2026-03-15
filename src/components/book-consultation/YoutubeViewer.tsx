'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '../../lib/ApiClient'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VideoPost {
  id: string
  day: string
  month: string
  category: string
  title: string
  videoId: string
}

export interface PagedVideosResponse {
  totalCount: number
  values: VideoPost[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const thumb = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/oar2.jpg`
const embedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Therapy: '#F5C5A3',
  Wellness: '#A8DFBA'
}

const PAGE_SIZE = 10

const CARD_W = 300

// ─── Query ────────────────────────────────────────────────────────────────────

async function fetchVideosPage(pageNumber: number): Promise<PagedVideosResponse> {
  return apiClient.get<PagedVideosResponse>(`videos?PageNumber=${pageNumber}&PageSize=${PAGE_SIZE}`)
}

// ─── VideoCardSkeleton ────────────────────────────────────────────────────────
// Uses explicit pixel heights so it never depends on parent container width

function VideoCardSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: 'background.neutral'
      }}
    >
      {/* aspect-ratio matches paddingTop: calc(100% * 16/9) of real card */}
      <Box sx={{ width: '100%', aspectRatio: '9/16', position: 'relative' }}>
        <Skeleton
          variant='rectangular'
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            borderRadius: '16px 16px 0 0',
            transform: 'none'
          }}
        />
      </Box>
      <Box sx={{ p: '14px 16px 18px' }}>
        <Skeleton variant='rounded' width={64} height={20} sx={{ mb: 1.5, borderRadius: '6px', transform: 'none' }} />
        <Skeleton variant='text' height={18} sx={{ mb: 0.75, transform: 'none' }} />
        <Skeleton variant='text' height={18} sx={{ mb: 0.75, transform: 'none' }} />
        <Skeleton variant='text' width='60%' height={18} sx={{ transform: 'none' }} />
      </Box>
    </Box>
  )
}

// ─── PlayIcon ─────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width='48' height='48' viewBox='0 0 48 48' fill='none'>
      <circle cx='24' cy='24' r='24' fill='rgba(255,255,255,0.92)' />
      <path d='M20 16l14 8-14 8V16z' fill='#2C1A0E' />
    </svg>
  )
}

// ─── VideoCard ────────────────────────────────────────────────────────────────

interface VideoCardProps {
  post: VideoPost
  playing: boolean
  onPlay: () => void
}

function VideoCard({ post, playing, onPlay }: VideoCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        height: '100%'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: 'calc(100% * 16 / 9)',
          overflow: 'hidden',
          flexShrink: 0,
          borderRadius: '16px 16px 0 0',
          bgcolor: '#000',
          cursor: 'pointer'
        }}
        onClick={onPlay}
      >
        {playing ? (
          <iframe
            src={embedUrl(post.videoId)}
            title={post.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        ) : (
          <>
            <Box
              component='img'
              src={thumb(post.videoId)}
              alt={post.title}
              draggable={false}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                userSelect: 'none',
                pointerEvents: 'none',
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '.swiper-slide:hover &': { transform: 'scale(1.07)' }
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.08)',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.18)' }
              }}
            >
              <Box sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
                <PlayIcon />
              </Box>
            </Box>

            {/* Date badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 14,
                left: 14,
                bgcolor: 'text.primary',
                color: 'background.paper',
                borderRadius: '8px',
                px: 1.25,
                py: 0.75,
                textAlign: 'center',
                lineHeight: 1.2,
                zIndex: 1,
                minWidth: 44,
                userSelect: 'none'
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1, color: 'inherit' }}>
                {post.day}
              </Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: 'inherit' }}>
                {post.month}
              </Typography>
            </Box>

            {/* Shorts badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                bgcolor: alpha('#FF0000', 0.88),
                color: '#fff',
                borderRadius: '6px',
                px: 1,
                py: 0.375,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                zIndex: 1
              }}
            >
              <svg width='12' height='12' viewBox='0 0 12 12' fill='white'>
                <path d='M1 2.5C1 1.67 1.895 1.17 2.6 1.6l7.6 4.8c.667.44.667 1.36 0 1.8L2.6 13c-.705.43-1.6-.07-1.6-.9V2.5z' />
              </svg>
              <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'inherit', lineHeight: 1 }}>Shorts</Typography>
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ p: '14px 16px 18px', flexGrow: 1 }}>
        <Box
          component='span'
          sx={{
            display: 'inline-block',
            px: 1.25,
            py: 0.375,
            borderRadius: '6px',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            bgcolor: CATEGORY_COLORS[post.category] ?? alpha('#F5C5A3', 0.15),
            color: 'text.primary',
            mb: 1.25
          }}
        >
          {post.category}
        </Box>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.45,
            color: 'text.primary',
            fontFamily: '"DM Serif Display", serif',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {post.title}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface YoutubeViewerProps {
  initialPosts?: VideoPost[]
  totalCount?: number
  eyebrow?: string
  heading?: string
  subheading?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function YoutubeViewer({
  initialPosts = [],
  totalCount = 0,
  eyebrow = 'Favourite Topics',
  heading = 'Healingy Blog & Resources',
  subheading = 'Your go-to source for mental health insights, tools, and advice.'
}: YoutubeViewerProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Render Swiper only after hydration — prevents layout flash from useMediaQuery mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [activeId, setActiveId] = useState<string | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<PagedVideosResponse>({
    queryKey: ['videos'],
    queryFn: ({ pageParam }) => fetchVideosPage(pageParam as number),
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      const loadedCount = allPages.reduce((sum, p) => sum + p.values.length, 0)
      const total = lastPage.totalCount ?? totalCount
      return loadedCount < total ? nextPage : undefined
    },
    initialData: {
      pages: [{ totalCount, values: initialPosts }],
      pageParams: [1]
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })

  const ssrVideos = initialPosts
  const queryVideos = data?.pages.slice(1).flatMap(p => p.values) ?? []
  const allVideos = [...ssrVideos, ...queryVideos.filter(v => !ssrVideos.some(s => s.id === v.id))]

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const remaining = swiper.slides.length - swiper.activeIndex - 1
      if (remaining <= 3 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  if (!allVideos.length) return null

  return (
    <Box component='section' sx={{ overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 }, px: 2 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            mb: 1.5
          }}
        >
          {eyebrow}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: 28, md: 38 },
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'text.primary',
            mb: 1.5,
            fontFamily: '"DM Serif Display", serif'
          }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: 14, md: 15 }, color: 'text.secondary', lineHeight: 1.7, maxWidth: 460, mx: 'auto' }}
        >
          {subheading}
        </Typography>
      </Box>

      {!mounted ? (
        // ── Skeleton row — uses same aspect-ratio as real VideoCard ───────────
        <Box sx={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
          {[0, 1, 2, 3].map(i => (
            <Box
              key={i}
              sx={{
                width: CARD_W,
                flexShrink: 0,
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: 'background.neutral'
              }}
            >
              {/* aspect-ratio matches paddingTop: calc(100% * 16/9) of real card */}
              <Box sx={{ width: '100%', aspectRatio: '9/16', position: 'relative' }}>
                <Skeleton
                  variant='rectangular'
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px 16px 0 0',
                    transform: 'none'
                  }}
                />
              </Box>
              {/* Body */}
              <Box sx={{ p: '14px 16px 18px' }}>
                <Skeleton
                  variant='rounded'
                  width={64}
                  height={20}
                  sx={{ mb: 1.5, borderRadius: '6px', transform: 'none' }}
                />
                <Skeleton variant='text' height={18} sx={{ mb: 0.75, transform: 'none' }} />
                <Skeleton variant='text' height={18} sx={{ mb: 0.75, transform: 'none' }} />
                <Skeleton variant='text' width='60%' height={18} sx={{ transform: 'none' }} />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        // ── Real Swiper ────────────────────────────────────────────────────────
        <Box
          sx={{
            '& .swiper': {
              cursor: { xs: 'default', md: 'grab' },
              overflow: 'visible',
              paddingBottom: { xs: '40px', md: '0px' }
            },
            '& .swiper.swiper-pointer-events': { cursor: 'grabbing' },
            '@media (hover: hover)': {
              '& .swiper-slide:hover .blog-img': { transform: 'scale(1.07)' }
            },
            '& .swiper-pagination': { bottom: 0 },
            '& .swiper-pagination-bullet': {
              width: 8,
              height: 8,
              backgroundColor: theme.palette.grey[300],
              opacity: 1,
              transition: 'width 0.3s ease, background-color 0.3s ease',
              borderRadius: 4
            },
            '& .swiper-pagination-bullet-active': {
              width: 20,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4
            }
          }}
        >
          <Swiper
            modules={isMobile ? [Pagination] : [FreeMode]}
            onSlideChange={handleSlideChange}
            slidesPerView='auto'
            touchRatio={1}
            resistance={true}
            a11y={{ enabled: true }}
            {...(isMobile
              ? {
                  centeredSlides: true,
                  spaceBetween: 16,
                  grabCursor: false,
                  resistanceRatio: 0.6,
                  freeMode: false,
                  pagination: { clickable: true }
                }
              : {
                  centeredSlides: false,
                  spaceBetween: 20,
                  grabCursor: true,
                  resistanceRatio: 0.85,
                  freeMode: { enabled: true, momentum: true, momentumRatio: 0.6, momentumVelocityRatio: 0.8 },
                  pagination: false
                })}
          >
            {allVideos.map(post => (
              <SwiperSlide
                key={post.id}
                style={{
                  width: isMobile ? '80vw' : `${CARD_W}px`,
                  maxWidth: isMobile ? '320px' : `${CARD_W}px`,
                  height: 'auto'
                }}
              >
                <VideoCard post={post} playing={activeId === post.id} onPlay={() => setActiveId(post.id)} />
              </SwiperSlide>
            ))}

            {isFetchingNextPage &&
              [0, 1, 2].map(i => (
                <SwiperSlide key={`sk-${i}`} style={{ width: `${CARD_W}px`, height: 'auto' }}>
                  <VideoCardSkeleton />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      )}
    </Box>
  )
}
