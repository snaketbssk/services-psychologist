'use client'

import Image from 'next/image'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Benefit {
  title: string
  description: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_BENEFITS: Benefit[] = [
  {
    title: 'Top Psychologists:',
    description: 'Our team of professionals is highly qualified and experienced in the field of psychology and therapy.'
  },
  {
    title: 'Effective Methods:',
    description: 'We use modern, proven therapeutic methods to help you achieve a balanced and more fulfilling life.'
  },
  {
    title: 'Ongoing Support:',
    description:
      'We provide support not only during therapy sessions but also with advice and guidance after each session.'
  }
]

// ─── Check icon ───────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <Box
      component='span'
      sx={{
        flexShrink: 0,
        width: 22,
        height: 22,
        borderRadius: '6px',
        bgcolor: '#FAD9C0', // light peach
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '2px' // optical alignment with title baseline
      }}
    >
      <svg
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        stroke='#2C1A0E'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M2 6l3 3 5-5' />
      </svg>
    </Box>
  )
}

function ArrowRightIcon() {
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
      <path d='M3 8h10M9 4l4 4-4 4' />
    </svg>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface BenefitsSectionProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  benefits?: Benefit[]
  ctaLabel?: string
  ctaHref?: string
  image?: string
  imageAlt?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BenefitsSection({
  eyebrow = 'Why Choose Us',
  heading = 'Benefits Of Choosing Healingy',
  subheading = 'We are deeply committed to bringing positive, meaningful, and lasting change to your life, empowering you to thrive & achieve your fullest potential.',
  benefits = DEFAULT_BENEFITS,
  ctaLabel = 'Contact Us Now',
  ctaHref = '/contact-us',
  image = 'https://healingynextjs.vercel.app/images/section/section-benefit.jpg',
  imageAlt = 'Therapist in session'
}: BenefitsSectionProps) {
  const theme = useTheme()

  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'stretch' // image stretches to match left column height
          }}
        >
          {/* ── Left column ── */}
          <Box>
            {/* Eyebrow */}
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

            {/* Heading */}
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 400,
                lineHeight: 1.18,
                color: 'text.primary',
                fontFamily: '"DM Serif Display", serif',
                mb: 2
              }}
            >
              {heading}
            </Typography>

            {/* Subheading */}
            <Typography
              sx={{
                fontSize: { xs: 13.5, md: 14.5 },
                color: 'text.secondary',
                lineHeight: 1.7,
                mb: 3,
                maxWidth: 500
              }}
            >
              {subheading}
            </Typography>

            <Divider sx={{ borderColor: 'grey.300', mb: 3.5 }} />

            {/* Benefits list */}
            <Stack spacing={3} sx={{ mb: 4.5 }}>
              {benefits.map(benefit => (
                <Box key={benefit.title}>
                  {/* Title row with check icon */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.25,
                      mb: 0.75
                    }}
                  >
                    <CheckIcon />
                    <Typography
                      sx={{
                        fontSize: { xs: 16, md: 17 },
                        fontWeight: 600,
                        color: 'text.primary',
                        fontFamily: '"DM Serif Display", serif',
                        lineHeight: 1.3
                      }}
                    >
                      {benefit.title}
                    </Typography>
                  </Box>

                  {/* Description — indented to align with title text */}
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      pl: `${22 + 10}px` // icon width + gap
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* CTA */}
            <Button
              component={Link}
              href={ctaHref}
              variant='outlined'
              endIcon={<ArrowRightIcon />}
              sx={{
                borderRadius: '50px',
                px: 3.5,
                py: 1.25,
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'none',
                color: 'text.primary',
                borderColor: 'text.primary',
                gap: 1,
                transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  bgcolor: 'primary.main',
                  borderColor: 'primary.main',
                  color: 'primary.contrastText'
                },
                '& .MuiButton-endIcon': { ml: 0.5 }
              }}
            >
              {ctaLabel}
            </Button>
          </Box>

          {/* ── Right column: image ── */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              // on mobile keep a fixed ratio; on desktop fill the full left-column height
              minHeight: { xs: '280px', md: '100%' },
              borderRadius: '20px',
              overflow: 'hidden',
              order: { xs: -1, md: 0 },
              '&:hover img': {
                transform: 'scale(1.06)'
              }
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes='(max-width: 900px) 100vw, 50vw'
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform'
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
