'use client'

import { LinearProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { alpha, styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PdfDocument {
  id: string
  title: string
  subtitle?: string
  url: string // publicly accessible PDF URL
  category?: string
  date?: string
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_DOCS: PdfDocument[] = [
  {
    id: '1',
    title: 'Mindfulness Guide',
    subtitle: 'Practical tools for daily practice',
    category: 'Therapy',
    date: 'Sep 12',
    url: 'https://www.w3.org/WAI/WCAG21/wcag21.pdf'
  },
  {
    id: '2',
    title: 'Anxiety Workbook',
    subtitle: 'CBT exercises and journaling prompts',
    category: 'Wellness',
    date: 'Sep 14',
    url: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: '3',
    title: 'Stress Management',
    subtitle: 'Evidence-based coping strategies',
    category: 'Therapy',
    date: 'Sep 16',
    url: 'https://www.orimi.com/pdf-test.pdf'
  },
  {
    id: '4',
    title: 'Relationships & Communication',
    subtitle: 'Building healthy connections',
    category: 'Wellness',
    date: 'Sep 18',
    url: 'https://www.africau.edu/images/default/sample.pdf'
  }
]

// Category colors — from Healingy pastel palette
const CATEGORY_COLORS: Record<string, string> = {
  Therapy: '#F5C5A3',
  Wellness: '#A8DFBA'
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M11 4L6 9l5 5' />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M7 4l5 5-5 5' />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M8 2v8M5 7l3 3 3-3' />
      <path d='M2 12h12' />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 2H2v10h10V8M8 2h4v4M6 8l5-5' />
    </svg>
  )
}

// ─── Styled nav button ────────────────────────────────────────────────────────

const NavBtn = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  transition: 'background 0.2s, border-color 0.2s, color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.text.primary
  },
  '&:disabled': { opacity: 0.35 }
}))

// ─── Props ────────────────────────────────────────────────────────────────────

interface DocumentViewerProps {
  documents?: PdfDocument[]
  eyebrow?: string
  heading?: string
  subheading?: string
  /** viewer height in px */
  viewerHeight?: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocumentViewer({
  documents = DEFAULT_DOCS,
  eyebrow = 'Resources',
  heading = 'Documents & Guides',
  subheading = 'Browse our collection of therapeutic resources and guides.',
  viewerHeight = 620
}: DocumentViewerProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [activeIdx, setActiveIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const total = documents.length
  const doc = documents[activeIdx]

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= total) return
      setLoading(true)
      setActiveIdx(idx)
    },
    [total]
  )

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(activeIdx + 1)
      if (e.key === 'ArrowLeft') goTo(activeIdx - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIdx, goTo])

  return (
    <Box component='section' sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth='lg'>
        {/* ── Header ── */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2
            }}
          >
            <Box>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: 28, md: 38 },
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: 'text.primary',
                  fontFamily: '"DM Serif Display", serif',
                  mb: 1
                }}
              >
                {heading}
              </Typography>
              <Typography sx={{ fontSize: 14.5, color: 'text.secondary', lineHeight: 1.7 }}>{subheading}</Typography>
            </Box>
            {/* Counter */}
            <Typography sx={{ fontSize: 13, color: 'text.secondary', flexShrink: 0 }}>
              {activeIdx + 1} / {total}
            </Typography>
          </Box>
        </Box>

        {/* ── Main layout: viewer + sidebar ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 320px' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start'
          }}
        >
          {/* ── PDF viewer ── */}
          <Box
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.grey[300]}`,
              bgcolor: 'background.paper',
              position: 'relative'
            }}
          >
            {/* Viewer toolbar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                py: 1.5,
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
                bgcolor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {doc.category && (
                  <Box
                    component='span'
                    sx={{
                      px: 1.25,
                      py: 0.375,
                      borderRadius: '6px',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      bgcolor: CATEGORY_COLORS[doc.category] ?? alpha(theme.palette.primary.main, 0.15),
                      color: 'text.primary'
                    }}
                  >
                    {doc.category}
                  </Box>
                )}
                <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.primary' }}>{doc.title}</Typography>
              </Box>

              {/* Action buttons */}
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  component='a'
                  href={doc.url}
                  download
                  size='small'
                  title='Download'
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  component='a'
                  href={doc.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  size='small'
                  title='Open in new tab'
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                >
                  <ExternalIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Loading overlay */}
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  right: 0,
                  zIndex: 2
                }}
              >
                <LinearProgress
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' }
                  }}
                />
              </Box>
            )}

            {/* iframe PDF embed */}
            <Box sx={{ height: isMobile ? 420 : viewerHeight }}>
              <iframe
                ref={iframeRef}
                key={doc.url} // forces remount on URL change
                src={`${doc.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                width='100%'
                height='100%'
                style={{ border: 'none', display: 'block' }}
                title={doc.title}
                onLoad={() => setLoading(false)}
              />
            </Box>
          </Box>

          {/* ── Sidebar: document list ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 0.5
              }}
            >
              All documents
            </Typography>

            {documents.map((d, i) => (
              <Box
                key={d.id}
                onClick={() => goTo(i)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: '12px 14px',
                  borderRadius: '12px',
                  border: `1px solid ${i === activeIdx ? theme.palette.primary.main : theme.palette.grey[300]}`,
                  bgcolor: i === activeIdx ? alpha(theme.palette.primary.main, 0.06) : 'background.paper',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.04)
                  }
                }}
              >
                {/* Number circle */}
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: i === activeIdx ? 'primary.main' : alpha(theme.palette.primary.main, 0.12),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    color: i === activeIdx ? 'primary.contrastText' : 'text.primary',
                    transition: 'background 0.2s'
                  }}
                >
                  {i + 1}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: i === activeIdx ? 600 : 400,
                      color: 'text.primary',
                      fontFamily: '"DM Serif Display", serif',
                      lineHeight: 1.3,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {d.title}
                  </Typography>
                  {d.subtitle && (
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25, lineHeight: 1.3 }}>
                      {d.subtitle}
                    </Typography>
                  )}
                </Box>

                {d.category && (
                  <Box
                    component='span'
                    sx={{
                      flexShrink: 0,
                      px: 1,
                      py: 0.25,
                      borderRadius: '6px',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      bgcolor: CATEGORY_COLORS[d.category] ?? alpha(theme.palette.primary.main, 0.15),
                      color: 'text.primary'
                    }}
                  >
                    {d.category}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Dot navigation ── */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          {/* Prev button */}
          <NavBtn onClick={() => goTo(activeIdx - 1)} disabled={activeIdx === 0} aria-label='Previous document'>
            <ChevronLeft />
          </NavBtn>

          {/* Dots */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {documents.map((d, i) => (
              <Box
                key={d.id}
                onClick={() => goTo(i)}
                title={d.title}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75
                }}
              >
                {/* Dot */}
                <Box
                  sx={{
                    width: i === activeIdx ? 28 : 10,
                    height: 10,
                    borderRadius: 5,
                    bgcolor:
                      i === activeIdx
                        ? 'primary.main'
                        : i < activeIdx
                        ? alpha(theme.palette.primary.main, 0.4)
                        : theme.palette.grey[300],
                    transition: 'width 0.3s ease, background-color 0.3s ease'
                  }}
                />
                {/* Label — only active dot shows title */}
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'text.secondary',
                    opacity: i === activeIdx ? 1 : 0,
                    transform: i === activeIdx ? 'translateY(0)' : 'translateY(-4px)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                    whiteSpace: 'nowrap',
                    maxWidth: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    pointerEvents: 'none'
                  }}
                >
                  {d.title}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Next button */}
          <NavBtn onClick={() => goTo(activeIdx + 1)} disabled={activeIdx === total - 1} aria-label='Next document'>
            <ChevronRight />
          </NavBtn>
        </Box>
      </Container>
    </Box>
  )
}
