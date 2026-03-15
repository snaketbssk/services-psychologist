'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProcessStep {
  number: number
  title: string
  description: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'Contact Consultation',
    description: "Contact us via phone, email to schedule an initial consultation where we'll explore your needs."
  },
  {
    number: 2,
    title: 'Customized Plan',
    description:
      "We'll develop a personalized therapy plan based on your specific needs and goals to ensure the most support."
  },
  {
    number: 3,
    title: 'Therapy Sessions',
    description: "Contact us via phone, email to schedule an initial consultation where we'll explore your needs."
  },
  {
    number: 4,
    title: 'Ongoing Support',
    description:
      "We'll provide continuous support, regularly review your progress, and adjust the plan as needed to help you."
  }
]

// ─── Props ────────────────────────────────────────────────────────────────────

interface TherapyProcessProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  steps?: ProcessStep[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TherapyProcess({
  eyebrow = 'How We Work',
  heading = 'Counseling & Therapy Process',
  subheading = 'Supporting you from consultation to care for a smooth path to mental well-being.',
  steps = DEFAULT_STEPS
}: TherapyProcessProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Circle diameter — used to precisely center the line
  const CIRCLE_SIZE = 56

  return (
    <Box component='section' sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth='lg'>
        {/* ── Header ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
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
              fontSize: { xs: 30, md: 46 },
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'text.primary',
              fontFamily: '"DM Serif Display", serif',
              mb: 2
            }}
          >
            {heading}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 14, md: 15 },
              color: 'text.secondary',
              lineHeight: 1.7,
              maxWidth: 520,
              mx: 'auto'
            }}
          >
            {subheading}
          </Typography>
        </Box>

        {/* ── Steps ── */}
        {isMobile ? (
          // ── Mobile: vertical timeline ─────────────────────────────────────
          <Box
            sx={{
              position: 'relative',
              // left padding = circle size + gap between circle and text
              pl: `${CIRCLE_SIZE + 20}px`
            }}
          >
            {/* Vertical line — centered behind circles */}
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                // horizontally centered on the circle column
                left: CIRCLE_SIZE / 2,
                // starts from center of first circle, ends at center of last
                top: CIRCLE_SIZE / 2,
                bottom: CIRCLE_SIZE / 2,
                width: '1px',
                bgcolor: theme.palette.grey[300],
                zIndex: 0
              }}
            />

            {steps.map((step, i) => (
              <Box
                key={step.number}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: i < steps.length - 1 ? 4 : 0,
                  minHeight: CIRCLE_SIZE
                }}
              >
                {/* Circle — absolutely positioned in the left gutter */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: -CIRCLE_SIZE - 20, // pull back into the gutter
                    top: 0,
                    zIndex: 1,
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    borderRadius: '50%',
                    bgcolor: '#FAD9C0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"DM Serif Display", serif',
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'text.primary',
                    // white halo punches through the vertical line
                    boxShadow: `0 0 0 5px ${theme.palette.background.default}`,
                    flexShrink: 0
                  }}
                >
                  {step.number}
                </Box>

                {/* Text — no background, just clean content */}
                <Box sx={{ pt: 0.75 }}>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'text.primary',
                      fontFamily: '"DM Serif Display", serif',
                      mb: 0.75,
                      lineHeight: 1.3
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: 'text.secondary',
                      lineHeight: 1.65
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          // ── Desktop: horizontal timeline ──────────────────────────────────
          <Box>
            {/* Row 1: circles + connecting lines */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                alignItems: 'center',
                mb: 4,
                position: 'relative'
              }}
            >
              {steps.map((step, i) => (
                <Box key={step.number} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  {/* Connecting line between circles */}
                  {i < steps.length - 1 && (
                    <Box
                      aria-hidden
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        right: '-50%',
                        height: '1px',
                        bgcolor: theme.palette.grey[300],
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 0
                      }}
                    />
                  )}

                  {/* Circle */}
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      mx: 'auto',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: '#FAD9C0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"DM Serif Display", serif',
                      fontSize: 28,
                      fontWeight: 400,
                      color: 'text.primary',
                      boxShadow: `0 0 0 8px ${theme.palette.background.default}`,
                      transition: 'background 0.25s ease, transform 0.25s ease',
                      '&:hover': {
                        bgcolor: '#F5C5A3',
                        transform: 'scale(1.06)'
                      }
                    }}
                  >
                    {step.number}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Row 2: titles + descriptions */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                gap: 2
              }}
            >
              {steps.map(step => (
                <Box key={step.number} sx={{ textAlign: 'center', px: 1.5 }}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: 'text.primary',
                      fontFamily: '"DM Serif Display", serif',
                      mb: 1.25
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: 'text.secondary',
                      lineHeight: 1.7
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}
