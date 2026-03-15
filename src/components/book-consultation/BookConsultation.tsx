'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { apiClient } from '../../lib/ApiClient'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

// Single model used for both GET (prefill) and POST (submit)
interface ConsultationPayload {
  name: string
  email: string
  phoneNumber: string
  message: string
}

// ─── Validation — mirrors C# CreateConsultationCommandValidator ───────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) errors.name = 'Name is required.'
  else if (form.name.length > 255) errors.name = 'Name must be less than 255 characters.'

  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.'
  else if (form.email.length > 255) errors.email = 'Email must be less than 255 characters.'

  if (!form.phone.trim()) errors.phone = 'Phone number is required.'
  else if (form.phone.length > 255) errors.phone = 'Phone number must be less than 255 characters.'

  if (!form.message.trim()) errors.message = 'Message is required.'
  else if (form.message.length > 1000) errors.message = 'Message must be less than 1000 characters.'

  return errors
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
}

// ─── API functions ────────────────────────────────────────────────────────────

// POST — submit form using ConsultationPayload shape
async function submitConsultation(payload: ConsultationPayload): Promise<void> {
  await apiClient.post('/api/consultation', payload)
}

// ─── Styled primitives ────────────────────────────────────────────────────────

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 10,
    padding: '11px 13px',
    [theme.breakpoints.up('md')]: { padding: '13px 15px' },
    fontSize: 14,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&::placeholder': { color: theme.palette.grey[500], opacity: 1 },
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
    }
  }
}))

const StyledTextarea = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 10,
    padding: '11px 13px',
    [theme.breakpoints.up('md')]: { padding: '13px 15px' },
    fontSize: 14,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    minHeight: 80,
    [theme.breakpoints.up('md')]: { minHeight: 96 },
    resize: 'vertical',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&::placeholder': { color: theme.palette.grey[500], opacity: 1 },
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
    }
  }
}))

// ─── Icons ────────────────────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.5'>
      <rect x='2' y='5' width='16' height='12' rx='2' />
      <path d='M2 7l8 5 8-5' />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.5'>
      <path d='M4 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L13 11l4 1.5V16a1 1 0 01-1 1C7.163 17 3 12.837 3 4a1 1 0 011-1z' />
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.5'>
      <path d='M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z' />
      <circle cx='10' cy='8' r='2' />
    </svg>
  )
}
function ArrowRightIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <path d='M3 8h10M9 4l4 4-4 4' />
    </svg>
  )
}

const CONTACT_INFO = [
  { id: 'email', label: 'themesflat@gmail.com', icon: <EmailIcon /> },
  { id: 'phone', label: '1-333-345-6868', icon: <PhoneIcon /> },
  { id: 'address', label: '101 E 129th St, East Chicago, IN 46312, US', icon: <LocationIcon /> }
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookConsultation() {
  const theme = useTheme()
  const { t } = useTranslation()

  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})

  // ── useMutation — submit form using ConsultationPayload shape ─────────────
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: submitConsultation,
    onSuccess: () => {
      setTimeout(() => {
        setForm(INITIAL_FORM)
        setErrors({})
        reset()
      }, 3000)
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    mutate({
      name: form.name,
      email: form.email,
      phoneNumber: form.phone, // form: phone → API: phoneNumber
      message: form.message
    })
  }

  const btnLabel = isPending ? 'Sending…' : isSuccess ? '✓ Message sent!' : 'Submit'
  const btnBg = isSuccess ? 'success.main' : 'primary.main'
  const btnColor = isSuccess ? 'success.darker' : 'primary.contrastText'
  const btnHover = isSuccess ? 'success.main' : 'primary.dark'

  return (
    <Box
      component='section'
      sx={{
        bgcolor: 'background.neutral',
        borderRadius: { xs: '16px', md: '20px' },
        p: { xs: '24px 20px', sm: '32px 28px', md: '56px 52px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
        gap: { xs: 3, sm: 3.5, md: 6 },
        alignItems: 'center',
        maxWidth: 1100,
        mx: 'auto'
      }}
    >
      {/* ── Left column ── */}
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            mb: { xs: 1, md: 2 }
          }}
        >
          {t('BOOK_CONSULTATION.HEADER')}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: 26, sm: 30, md: 40 },
            fontWeight: 400,
            lineHeight: 1.18,
            color: 'text.primary',
            mb: { xs: 1.5, md: 2.25 }
          }}
        >
          {t('BOOK_CONSULTATION.MAIN')}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 13.5, md: 14.5 },
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: { xs: 2.5, md: 3.5 },
            maxWidth: 380
          }}
        >
          {t('BOOK_CONSULTATION.DESCRIPTION')}
        </Typography>
        <Divider sx={{ borderColor: 'grey.300', mb: { xs: 2, md: 3 } }} />
        <Stack
          component='ul'
          spacing={{ xs: 1.25, md: 1.75 }}
          sx={{ listStyle: 'none', p: 0, m: 0, mb: { xs: 2.5, md: 3.5 } }}
        >
          {CONTACT_INFO.map(({ id, label, icon }) => (
            <Box
              key={id}
              component='li'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                fontSize: { xs: 13, md: 14 },
                color: 'text.primary',
                '& svg': { color: 'text.secondary', flexShrink: 0 }
              }}
            >
              {icon}
              {label}
            </Box>
          ))}
        </Stack>
        <Box
          component={Link}
          href='/contact-us'
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontSize: { xs: 13, md: 14 },
            fontWeight: 600,
            color: 'text.primary',
            textDecoration: 'none',
            transition: 'gap 0.2s ease',
            '&:hover': { gap: '12px' }
          }}
        >
          Open map <ArrowRightIcon />
        </Box>
      </Box>

      {/* ── Right card ── */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: { xs: '12px', md: '16px' },
          p: { xs: '20px 16px 20px', sm: '28px 24px', md: '36px 32px 32px' },
          boxShadow: `0 2px 24px ${alpha(theme.palette.text.primary, 0.07)}`
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontSize: { xs: 20, md: 26 },
            fontWeight: 400,
            color: 'text.primary',
            textAlign: 'center',
            mb: { xs: 2, md: 3.25 }
          }}
        >
          Get A Free Consultation
        </Typography>

        <Stack component='form' spacing={{ xs: 1.25, md: 1.625 }} onSubmit={handleSubmit} noValidate>
          <Box>
            <StyledInput
              name='name'
              type='text'
              placeholder={t('BOOK_CONSULTATION.NAME_INPUT')}
              value={form.name}
              onChange={handleInputChange}
              required
              disabled={isPending}
              inputProps={{ autoComplete: 'name' }}
              sx={{ '& .MuiInputBase-input': { borderColor: errors.name ? 'error.main' : undefined } }}
            />
            {errors.name && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5, ml: 0.5 }}>{errors.name}</Typography>
            )}
          </Box>

          <Box>
            <StyledInput
              name='email'
              type='email'
              placeholder={t('BOOK_CONSULTATION.EMAIL_INPUT')}
              value={form.email}
              onChange={handleInputChange}
              disabled={isPending}
              inputProps={{ autoComplete: 'email' }}
              sx={{ '& .MuiInputBase-input': { borderColor: errors.email ? 'error.main' : undefined } }}
            />
            {errors.email && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5, ml: 0.5 }}>{errors.email}</Typography>
            )}
          </Box>

          <Box>
            <StyledInput
              name='phone'
              type='tel'
              placeholder={t('BOOK_CONSULTATION.PHONE_INPUT')}
              value={form.phone}
              onChange={handleInputChange}
              disabled={isPending}
              inputProps={{ autoComplete: 'tel' }}
              sx={{ '& .MuiInputBase-input': { borderColor: errors.phone ? 'error.main' : undefined } }}
            />
            {errors.phone && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5, ml: 0.5 }}>{errors.phone}</Typography>
            )}
          </Box>

          <Box>
            <StyledTextarea
              name='message'
              placeholder={t('BOOK_CONSULTATION.MESSAGE_INPUT')}
              value={form.message}
              onChange={handleInputChange}
              disabled={isPending}
              multiline
              minRows={1}
              sx={{ '& .MuiInputBase-input': { borderColor: errors.message ? 'error.main' : undefined } }}
            />
            {errors.message && (
              <Typography sx={{ fontSize: 12, color: 'error.main', mt: 0.5, ml: 0.5 }}>{errors.message}</Typography>
            )}
          </Box>

          {isError && (
            <Typography sx={{ fontSize: 13, color: 'error.main', lineHeight: 1.5 }}>
              {(error as Error)?.message ?? 'Something went wrong. Please try again.'}
            </Typography>
          )}

          <Button
            type='submit'
            fullWidth
            disabled={isPending || isSuccess}
            sx={{
              py: { xs: 1.375, md: 1.75 },
              borderRadius: '10px',
              fontSize: { xs: 14, md: 15 },
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: btnBg,
              color: btnColor,
              boxShadow: 'none',
              transition: 'background 0.2s ease, transform 0.15s ease, color 0.2s ease',
              '&:hover': { bgcolor: btnHover, boxShadow: 'none' },
              '&:active': { transform: 'scale(0.985)' },
              '&.Mui-disabled': { bgcolor: btnBg, color: btnColor, opacity: 0.7 }
            }}
          >
            {btnLabel}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
