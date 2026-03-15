'use client'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  title: string
  description: string
  href: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_SERVICES: Service[] = [
  {
    title: 'Individual Counseling',
    description: 'Personal psychological support to help you overcome stress, anxiety, and regain confidence.',
    href: '/service-details'
  },
  {
    title: 'Family Therapy',
    description: 'Improve family relationships, resolve conflicts, and build a healthy living environment.',
    href: '/service-details'
  },
  {
    title: 'Couples Therapy',
    description: 'Enhance understanding affection between couples, helping to strengthen the relationship.',
    href: '/service-details'
  },
  {
    title: 'Group Therapy',
    description: 'Join others with similar challenges, sharing experiences and support in a guided group setting.',
    href: '/service-details'
  },
  {
    title: 'Child & Adolescent Therapy',
    description:
      'Specialized support for children and teens, helping them navigate emotional challenges and build resilience.',
    href: '/service-details'
  },
  {
    title: 'Trauma Counseling',
    description: 'Focused therapy to help you heal from past trauma and regain control over your life.',
    href: '/service-details'
  }
]

// ─── Styled ───────────────────────────────────────────────────────────────────

const ServiceCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: '28px 28px 24px',
  border: `1px solid ${theme.palette.grey[300]}`,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  height: '100%',
  '&:hover': {
    borderColor: theme.palette.primary.main, // peach border on hover
    boxShadow: `0 4px 24px rgba(44, 26, 14, 0.07)`
  },
  // animate the arrow on card hover
  '&:hover .read-more-arrow': {
    transform: 'translateX(5px)'
  }
}))

const ReadMoreLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  marginTop: 'auto',
  paddingTop: 28
}))

function ArrowRightIcon() {
  return (
    <svg
      className='read-more-arrow'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ transition: 'transform 0.2s ease', flexShrink: 0 }}
    >
      <path d='M3 9h12M11 5l4 4-4 4' />
    </svg>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface CounselingServicesProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  ctaLabel?: string
  ctaHref?: string
  services?: Service[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CounselingServices({
  eyebrow = 'What We Do',
  heading = 'Counseling & Therapy Services',
  subheading = 'We offer a wide range of services to meet your personal needs',
  ctaLabel = 'Explore Our Services',
  ctaHref = '/our-service',
  services = DEFAULT_SERVICES
}: CounselingServicesProps) {
  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'background.neutral', // linen #EDEAE2
        borderRadius: { xs: '16px', md: '20px' },
        py: { xs: 7, md: 10 }
      }}
    >
      <Container maxWidth='lg'>
        {/* ── Header row ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 2 },
            mb: { xs: 4, md: 6 }
          }}
        >
          {/* Left: eyebrow + heading + subheading */}
          <Box sx={{ maxWidth: 560 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 1.25
              }}
            >
              {eyebrow}
            </Typography>

            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: 28, md: 40 },
                fontWeight: 400,
                lineHeight: 1.15,
                color: 'text.primary',
                fontFamily: '"DM Serif Display", serif',
                mb: 1.5
              }}
            >
              {heading}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 13.5, md: 14.5 },
                color: 'text.secondary',
                lineHeight: 1.7
              }}
            >
              {subheading}
            </Typography>
          </Box>

          {/* Right: CTA button */}
          <Button
            component={Link}
            href={ctaHref}
            variant='outlined'
            sx={{
              flexShrink: 0,
              borderRadius: '50px', // pill shape — matches screenshot
              px: 3.5,
              py: 1.25,
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'none',
              color: 'text.primary',
              borderColor: 'text.primary',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
              '&:hover': {
                bgcolor: 'primary.main', // peach fill on hover
                borderColor: 'primary.main',
                color: 'primary.contrastText'
              }
            }}
          >
            {ctaLabel}
          </Button>
        </Box>

        {/* ── Service cards grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 2, md: 2.5 }
          }}
        >
          {services.map(service => (
            <ServiceCard key={service.title}>
              {/* Title */}
              <Typography
                sx={{
                  fontSize: { xs: 17, md: 19 },
                  fontWeight: 600,
                  color: 'text.primary',
                  fontFamily: '"DM Serif Display", serif',
                  mb: 1.5
                }}
              >
                {service.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'text.secondary',
                  lineHeight: 1.7
                }}
              >
                {service.description}
              </Typography>

              {/* Read More */}
              <ReadMoreLink href={service.href}>
                Read More <ArrowRightIcon />
              </ReadMoreLink>
            </ServiceCard>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
