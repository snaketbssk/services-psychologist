'use client'

import Image from 'next/image'
import { useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AccordionItem {
  title: string
  content: string
}

interface SocialButton {
  label: string
  sublabel?: string
  href: string
  icon: React.ReactNode
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_ACCORDION_ITEMS: AccordionItem[] = [
  {
    title: 'Работа и запрос',
    content:
      'Работаю с тревогой, стрессом, паническими атаками, низкой самооценкой, трудностями в отношениях и на работе. Помогаю найти себя и выстроить жизнь, которая приносит удовольствие.'
  },
  {
    title: 'Принципы работы',
    content:
      'Работаю в интегративном подходе, сочетая когнитивно-поведенческую терапию, гештальт и телесно-ориентированные методы. Каждая сессия — это безопасное пространство для изменений.'
  },
  {
    title: 'Формат и стоимость',
    content:
      'Онлайн-сессии 50 минут. Индивидуальные консультации и курс из 5 сессий. Подробнее о стоимости — в личных сообщениях.'
  },
  {
    title: 'Образование',
    content:
      'Высшее психологическое образование. Дополнительная подготовка по КПТ, гештальт-терапии и работе с травмой. Регулярная супервизия и личная терапия.'
  },
  {
    title: 'Не работаю',
    content:
      'Не работаю с психотическими расстройствами, острыми суицидальными состояниями, зависимостями в стадии активного употребления. В этих случаях помогу найти подходящего специалиста.'
  }
]

function TelegramIcon() {
  return (
    <svg width='22' height='22' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.15.674-.546.838-1.107.52l-3.067-2.26-1.48 1.424c-.163.163-.3.3-.616.3l.22-3.107 5.647-5.1c.246-.218-.053-.34-.38-.12L7.32 14.4l-2.99-.934c-.65-.204-.663-.65.135-.962l11.67-4.5c.54-.197 1.015.132.427.244z' />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width='22' height='22' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12.001 2C6.478 2 2 6.478 2 12c0 1.85.504 3.58 1.38 5.065L2 22l5.065-1.364A9.954 9.954 0 0012.001 22C17.524 22 22 17.522 22 12S17.524 2 12.001 2zm4.49 13.87c-.246-.123-1.455-.718-1.68-.8-.224-.082-.387-.123-.55.123-.163.246-.633.8-.776.964-.143.164-.286.184-.532.061-.246-.123-1.038-.382-1.977-1.22-.73-.65-1.223-1.454-1.367-1.7-.143-.246-.015-.379.108-.502.11-.11.246-.286.368-.43.123-.143.164-.245.246-.408.082-.163.041-.306-.02-.43-.062-.122-.55-1.326-.754-1.815-.198-.477-.4-.412-.55-.42l-.47-.008c-.163 0-.43.061-.654.306-.225.245-.857.838-.857 2.044s.877 2.372 1 2.535c.122.163 1.727 2.636 4.185 3.696.585.252 1.042.403 1.398.516.587.187 1.122.16 1.544.097.471-.07 1.455-.595 1.66-1.17.205-.574.205-1.065.143-1.168-.061-.102-.224-.163-.47-.286z' />
    </svg>
  )
}

const DEFAULT_SOCIAL_BUTTONS: SocialButton[] = [
  {
    label: 'Telegram',
    sublabel: 'Записаться на консультацию',
    href: 'https://t.me/elena_psy_online',
    icon: <TelegramIcon />
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/elena_psy_online',
    icon: <WhatsAppIcon />
  }
]

// ─── Styled accordion ─────────────────────────────────────────────────────────

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderRadius: '12px !important',
  border: `1px solid ${theme.palette.grey[300]}`,
  marginBottom: 10,
  '&::before': { display: 'none' },
  '&.Mui-expanded': {
    borderColor: theme.palette.primary.main
  }
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '4px 20px',
  minHeight: 56,
  '& .MuiAccordionSummary-content': { margin: '14px 0' },
  '& .MuiAccordionSummary-expandIconWrapper': { color: theme.palette.text.secondary },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { color: theme.palette.primary.dark }
}))

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronDown() {
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
      <path d='M4 7l5 5 5-5' />
    </svg>
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

interface BenefitsProfileProps {
  // Header
  eyebrow?: string
  heading?: string
  subheading?: string
  // Accordion
  accordionItems?: AccordionItem[]
  // CTA buttons
  socialButtons?: SocialButton[]
  // Image
  image?: string
  imageAlt?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BenefitsProfile({
  eyebrow = 'Why Choose Us',
  heading = 'Benefits Of Choosing Healingy',
  subheading = 'We are deeply committed to bringing positive, meaningful, and lasting change to your life, empowering you to thrive & achieve your fullest potential.',
  accordionItems = DEFAULT_ACCORDION_ITEMS,
  socialButtons = DEFAULT_SOCIAL_BUTTONS,
  image = 'https://healingynextjs.vercel.app/images/section/section-benefit.jpg',
  imageAlt = 'Therapist in session'
}: BenefitsProfileProps) {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box component='section' sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'stretch'
          }}
        >
          {/* ── Left column: header + accordions + buttons ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                mb: 3
              }}
            >
              {subheading}
            </Typography>

            <Divider sx={{ borderColor: 'grey.300', mb: 3 }} />

            {/* Accordion */}
            <Box sx={{ mb: 3.5, flex: 1 }}>
              {accordionItems.map((item, i) => (
                <StyledAccordion
                  key={item.title}
                  expanded={expanded === `panel-${i}`}
                  onChange={handleChange(`panel-${i}`)}
                  disableGutters
                >
                  <StyledAccordionSummary expandIcon={<ChevronDown />}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'text.primary',
                        fontFamily: '"DM Serif Display", serif'
                      }}
                    >
                      {item.title}
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ px: '20px', pt: 0, pb: 2.5 }}>
                    <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.75 }}>
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              ))}
            </Box>

            {/* CTA buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              {socialButtons.map((btn, i) => (
                <Button
                  key={btn.label}
                  component='a'
                  href={btn.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant={i === 0 ? 'contained' : 'outlined'}
                  sx={{
                    position: 'relative',
                    borderRadius: '50px',
                    py: btn.sublabel ? 1.375 : 1.5,
                    px: 3,
                    minWidth: 180,
                    ...(i === 0
                      ? {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          boxShadow: 'none',
                          '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
                        }
                      : {
                          bgcolor: 'transparent',
                          color: 'text.primary',
                          borderColor: 'grey.400',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            borderColor: 'primary.main',
                            color: 'primary.contrastText'
                          }
                        }),
                    textTransform: 'none',
                    transition: 'all 0.2s ease',
                    '&:active': { transform: 'scale(0.98)' }
                  }}
                >
                  {/* Icon left */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 18,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {btn.icon}
                  </Box>

                  {/* Label center */}
                  <Box sx={{ textAlign: 'center', mx: 'auto' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'inherit', lineHeight: 1.2 }}>
                      {btn.label}
                    </Typography>
                    {btn.sublabel && (
                      <Typography sx={{ fontSize: 12, color: 'inherit', opacity: 0.75, lineHeight: 1.3, mt: 0.25 }}>
                        {btn.sublabel}
                      </Typography>
                    )}
                  </Box>

                  {/* Arrow right — first button only */}
                  {i === 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 18,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ArrowRightIcon />
                    </Box>
                  )}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* ── Right column: image with zoom ── */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: { xs: '300px', md: '100%' },
              borderRadius: '20px',
              overflow: 'hidden',
              order: { xs: -1, md: 0 }, // image above text on mobile
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
