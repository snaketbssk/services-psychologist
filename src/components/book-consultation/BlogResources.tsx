'use client'

import Image from 'next/image'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// Swiper
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  day: string
  month: string
  category: string
  title: string
  href: string
  image: string
  imageAlt: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_POSTS: BlogPost[] = []

const CATEGORY_COLORS: Record<string, string> = {
  Therapy: '#F5C5A3',
  Wellness: '#A8DFBA'
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface BlogResourcesProps {
  posts?: BlogPost[]
  eyebrow?: string
  heading?: string
  subheading?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogResources({
  posts = DEFAULT_POSTS,
  eyebrow = 'Favourite Topics',
  heading = 'Healingy Blog & Resources',
  subheading = 'Your go-to source for mental health insights, tools, and advice.'
}: BlogResourcesProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      component='section'
      sx={{
        //py: { xs: 6, md: 10 },
        overflow: 'hidden'
      }}
    >
      {/* ── Header ── */}
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
          sx={{
            fontSize: { xs: 14, md: 15 },
            color: 'text.secondary',
            lineHeight: 1.7,
            maxWidth: 460,
            mx: 'auto'
          }}
        >
          {subheading}
        </Typography>
      </Box>

      {/* ── Swiper ── */}
      <Box
        sx={{
          //px: { xs: 0, md: 4 },

          '& .swiper': {
            cursor: { xs: 'default', md: 'grab' },
            overflow: 'visible',
            // room below for pagination dots on mobile
            paddingBottom: { xs: '40px', md: '0px' }
          },
          '& .swiper.swiper-pointer-events': {
            cursor: 'grabbing'
          },

          // image zoom on hover (desktop only — no hover on touch)
          '@media (hover: hover)': {
            '& .swiper-slide:hover .blog-img': {
              transform: 'scale(1.07)'
            }
          },

          // ── Pagination dots — pastel peach style ──
          '& .swiper-pagination': {
            bottom: 0
          },
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
            backgroundColor: theme.palette.primary.main, // peach #F5C5A3
            borderRadius: 4
          }
        }}
      >
        <Swiper
          // ── Mobile: snap mode ──────────────────────────────────────────────
          // ── Desktop: free drag mode ────────────────────────────────────────
          modules={isMobile ? [Pagination] : [FreeMode]}
          // Mobile snap behaviour
          {...(isMobile
            ? {
                slidesPerView: 'auto',
                centeredSlides: true, // active card always centered
                spaceBetween: 16,
                grabCursor: false,
                touchRatio: 1,
                resistance: true,
                resistanceRatio: 0.6,
                pagination: {
                  clickable: true
                },
                // snap to each slide
                cssMode: false, // keep touch events (not scroll-snap)
                freeMode: false
              }
            : {
                // Desktop free drag
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 20,
                grabCursor: true,
                touchRatio: 1,
                resistance: true,
                resistanceRatio: 0.85,
                freeMode: {
                  enabled: true,
                  momentum: true,
                  momentumRatio: 0.6,
                  momentumVelocityRatio: 0.8
                },
                pagination: false
              })}
          a11y={{ enabled: true }}
        >
          {posts.map(post => (
            <SwiperSlide
              key={post.id}
              style={{
                // Mobile: 80vw so next card peeks at ~10% on each side
                // Desktop: fixed 300px
                width: isMobile ? '80vw' : '300px',
                maxWidth: isMobile ? '320px' : '300px',
                height: 'auto'
              }}
            >
              <Box
                component={Link}
                href={post.href}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  bgcolor: 'background.neutral',
                  //backgroundColor: 'background.paper',
                  height: '100%'
                }}
              >
                {/* ── Image — 9:16 portrait ── */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: 'calc(100% * 16 / 9)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    borderRadius: '16px 16px 0 0'
                  }}
                >
                  <Image
                    className='blog-img'
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes='(max-width: 900px) 80vw, 300px'
                    style={
                      {
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        willChange: 'transform',
                        userSelect: 'none',
                        pointerEvents: 'none'
                      } as React.CSSProperties
                    }
                    draggable={false}
                  />

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
                </Box>

                {/* ── Body ── */}
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
                      bgcolor: CATEGORY_COLORS[post.category] ?? alpha(theme.palette.primary.main, 0.15),
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
