'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { alpha, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useScrollTrigger from '@mui/material/useScrollTrigger'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavChild {
  label: string
  href: string
  description?: string
  image?: string
  date?: string
}

interface NavItem {
  label: string
  href: string
  mega?: boolean
  megaTitle?: string
  children?: NavChild[]
  whatsNew?: NavChild[]
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    mega: true,
    megaTitle: 'Pages',
    children: [
      { label: 'Homepage 01', href: '/' },
      { label: 'Homepage 02', href: '/home-02' },
      { label: 'Homepage 03', href: '/home-03' },
      { label: 'Homepage 04', href: '/home-04' },
      { label: 'Home Slide Text Scroll', href: '/home-silde-text-scroll' }
    ]
  },
  {
    label: 'Services',
    href: '/our-service',
    mega: true,
    megaTitle: 'Counseling & Therapy Services',
    children: [
      {
        label: 'Family Therapy',
        href: '/service-details',
        description: 'Improve family relationships, resolve conflicts, and build a healthy living environment.'
      },
      {
        label: 'Child & Adolescent Therapy',
        href: '/service-details',
        description: 'Specialized support for children and teens, helping them navigate emotional challenges.'
      },
      {
        label: 'Group Therapy',
        href: '/service-details',
        description: 'Join others with similar challenges, sharing experiences and support in a guided group setting.'
      },
      {
        label: 'Couples Therapy',
        href: '/service-details',
        description: 'Enhance understanding affection between couples, helping to strengthen the relationship.'
      },
      {
        label: 'Trauma Counseling',
        href: '/service-details',
        description: 'Focused therapy to help you heal from past trauma and regain control over your life.'
      },
      {
        label: 'Individual Counseling',
        href: '/service-details',
        description: 'Personal psychological support to help you overcome stress, anxiety, and regain confidence.'
      }
    ],
    whatsNew: [
      {
        label: 'How Cognitive Behavioral Therap...',
        href: '/blog-details',
        date: 'Oct 17, 2024',
        image: '/images/blog/blog-details-list-1.jpg'
      },
      {
        label: 'Effective Strategies for Managing...',
        href: '/blog-details',
        date: 'Oct 19, 2024',
        image: '/images/blog/blog-details-list-2.jpg'
      },
      {
        label: 'Techniques for Everyday Stress...',
        href: '/blog-details',
        date: 'Oct 26, 2024',
        image: '/images/blog/blog-details-list-4.jpg'
      }
    ]
  },
  {
    label: 'Pages',
    href: '#',
    mega: true,
    megaTitle: 'Pages',
    children: [
      { label: 'About', href: '/about' },
      { label: 'Therapists', href: '/our-therapists' },
      { label: 'Appointment', href: '/book-appointment' }
    ]
  },
  {
    label: 'Shop',
    href: '#',
    mega: true,
    megaTitle: 'Shop',
    children: [
      { label: 'Our Product', href: '/our-product' },
      { label: 'Shop Cart', href: '/shop-cart' },
      { label: 'Check Out', href: '/shop-check-out' },
      { label: 'Shop Details', href: '/product-details' }
    ]
  },
  {
    label: 'Blogs',
    href: '#',
    mega: true,
    megaTitle: 'Blogs',
    children: [
      { label: 'Blog Grid', href: '/blog-grid' },
      { label: 'Blog Details 1', href: '/blog-details' },
      { label: 'Blog Details 2', href: '/blog-details-2' }
    ]
  },
  { label: 'Contact', href: '/contact-us' }
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
    >
      <circle cx='9' cy='9' r='6' />
      <path d='M14 14l3 3' />
    </svg>
  )
}
function CartIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M2 2h2l2.5 9h9l2-6H6' />
      <circle cx='9' cy='17' r='1.2' fill='currentColor' stroke='none' />
      <circle cx='15' cy='17' r='1.2' fill='currentColor' stroke='none' />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
    >
      <line x1='3' y1='6' x2='19' y2='6' />
      <line x1='3' y1='11' x2='19' y2='11' />
      <line x1='3' y1='16' x2='19' y2='16' />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
    >
      <line x1='4' y1='4' x2='16' y2='16' />
      <line x1='16' y1='4' x2='4' y2='16' />
    </svg>
  )
}
function ChevronDownIcon() {
  return (
    <svg
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
    >
      <path d='M2 4.5l4.5 4.5 4.5-4.5' />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    >
      <path d='M4 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L13 11l4 1.5V16a1 1 0 01-1 1C7.163 17 3 12.837 3 4a1 1 0 011-1z' />
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    >
      <path d='M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z' />
      <circle cx='10' cy='8' r='2' />
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    >
      <rect x='2' y='5' width='16' height='12' rx='2' />
      <path d='M2 7l8 5 8-5' />
    </svg>
  )
}
function WhatsAppIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.406 14.457c-.194.546-1.138 1.044-1.566 1.108-.407.06-.921.085-1.486-.093-.342-.107-.781-.25-1.342-.488-2.353-1.015-3.888-3.374-4.007-3.53-.12-.157-.975-1.296-.975-2.473s.617-1.756.836-1.995c.22-.24.48-.3.639-.3l.46.009c.148.006.346-.056.542.414.2.48.679 1.657.738 1.778.06.12.1.261.02.42-.08.16-.12.26-.238.4-.12.14-.252.313-.36.42-.12.12-.244.25-.105.49.14.24.621 1.024 1.333 1.658.916.816 1.689 1.07 1.929 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.397.66 1.637.78.24.12.4.18.46.28.06.1.06.58-.134 1.124z' />
    </svg>
  )
}
function XIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
    >
      <rect x='2' y='2' width='20' height='20' rx='5' />
      <circle cx='12' cy='12' r='4.5' />
      <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
    </svg>
  )
}
function SkypeIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M22.986 13.87A10.985 10.985 0 0012 2.014a10.982 10.982 0 00-6.318 2.005A6.47 6.47 0 002 10.5a6.5 6.5 0 006.5 6.5c.23 0 .459-.012.685-.036A10.98 10.98 0 0012 22a10.982 10.982 0 006.315-2.003A6.469 6.469 0 0022 13.5a6.494 6.494 0 00-1.014-3.63zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm2.5-4.5c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z' />
    </svg>
  )
}
function TelegramIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.15.674-.546.838-1.107.52l-3.067-2.26-1.48 1.424c-.163.163-.3.3-.616.3l.22-3.107 5.647-5.1c.246-.218-.053-.34-.38-.12L7.32 14.4l-2.99-.934c-.65-.204-.663-.65.135-.962l11.67-4.5c.54-.197 1.015.132.427.244z' />
    </svg>
  )
}

// ─── Mega dropdown ────────────────────────────────────────────────────────────

interface MegaDropdownProps {
  item: NavItem
  onClose: () => void
  isActive: (href: string) => boolean
  navbarBottom: number
}

function MegaDropdown({ item, onClose, isActive, navbarBottom }: MegaDropdownProps) {
  const theme = useTheme()
  const hasWhatsNew = Boolean(item.whatsNew?.length)
  const hasDescriptions = item.children?.some(c => c.description)

  return (
    <Box
      // The dropdown is positioned fixed — but we also include an invisible
      // "bridge" that fills the gap between the navbar bottom and the dropdown
      // top, so the mouse never leaves a hover zone when moving downward.
      sx={{
        position: 'fixed',
        top: navbarBottom,
        left: 0,
        right: 0,
        zIndex: 1300
      }}
    >
      {/* Invisible bridge — covers any gap between AppBar bottom and dropdown */}
      <Box sx={{ height: 4, width: '100%' }} />

      {/* Actual dropdown panel */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.grey[200]}`,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          boxShadow: `0 12px 40px ${alpha(theme.palette.text.primary, 0.1)}`
        }}
      >
        <Container maxWidth='lg'>
          <Box sx={{ display: 'flex', gap: 0, py: 3 }}>
            {/* Left: card grid or simple list */}
            <Box sx={{ flex: 1 }}>
              {item.megaTitle && (
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'text.secondary',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    mb: 2
                  }}
                >
                  {item.megaTitle}
                </Typography>
              )}

              {hasDescriptions ? (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, pr: hasWhatsNew ? 4 : 0 }}>
                  {item.children?.map(child => (
                    <Box
                      key={child.label}
                      component={Link}
                      href={child.href}
                      onClick={onClose}
                      sx={{
                        display: 'block',
                        p: '14px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${theme.palette.grey[200]}`,
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, background 0.2s',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.04)
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 0.5,
                          fontFamily: '"DM Serif Display", serif'
                        }}
                      >
                        {child.label}
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.6 }}>
                        {child.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, pr: hasWhatsNew ? 4 : 0 }}>
                  {item.children?.map(child => (
                    <Box
                      key={child.label}
                      component={Link}
                      href={child.href}
                      onClick={onClose}
                      sx={{
                        display: 'block',
                        px: 1.5,
                        py: 1,
                        borderRadius: '8px',
                        fontSize: 14,
                        color: isActive(child.href) ? 'text.primary' : 'text.secondary',
                        fontWeight: isActive(child.href) ? 600 : 400,
                        textDecoration: 'none',
                        transition: 'background 0.15s, color 0.15s',
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'text.primary' }
                      }}
                    >
                      {child.label}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Right: What's New sidebar */}
            {hasWhatsNew && (
              <>
                <Divider orientation='vertical' flexItem sx={{ borderColor: 'grey.200', mx: 0 }} />
                <Box sx={{ width: 280, pl: 4, flexShrink: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'text.secondary',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      mb: 2
                    }}
                  >
                    What's New
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {item.whatsNew?.map(post => (
                      <Box
                        key={post.label}
                        component={Link}
                        href={post.href}
                        onClick={onClose}
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          textDecoration: 'none',
                          '&:hover .post-title': { color: 'primary.dark' }
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            position: 'relative',
                            bgcolor: 'grey.200'
                          }}
                        >
                          {post.image && (
                            <Image src={post.image} alt={post.label} fill sizes='60px' style={{ objectFit: 'cover' }} />
                          )}
                        </Box>
                        <Box>
                          {post.date && (
                            <Typography
                              sx={{ fontSize: 11, color: 'text.secondary', mb: 0.25, letterSpacing: '0.04em' }}
                            >
                              {post.date.toUpperCase()}
                            </Typography>
                          )}
                          <Typography
                            className='post-title'
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: 'text.primary',
                              lineHeight: 1.4,
                              transition: 'color 0.2s'
                            }}
                          >
                            {post.label}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SiteHeaderProps {
  cartCount?: number
  address?: string
  email?: string
  phone?: string
  ctaLabel?: string
  ctaHref?: string
  logoSrc?: string
  logoAlt?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SiteHeader({
  cartCount = 2,
  address = '101 E 129th St, East Chicago, IN 46312, US',
  email = 'themesflat@gmail.com',
  phone = '1-555-678-8888',
  ctaLabel = 'Get Your Consult!',
  ctaHref = '/book-appointment',
  logoSrc = '/images/logo/logo1.png',
  logoAlt = 'Healingy'
}: SiteHeaderProps) {
  const theme = useTheme()
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const appBarRef = useRef<HTMLDivElement>(null)
  const [navbarBottom, setNavbarBottom] = useState(72)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const update = () => {
      if (appBarRef.current) {
        setNavbarBottom(appBarRef.current.getBoundingClientRect().bottom)
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 40 })

  const isActive = (href: string): boolean => (href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false)

  // Delayed close — gives the cursor time to travel from nav item into dropdown
  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 80)
  }, [])

  const handleDropdownMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const handleDropdownMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 80)
  }, [])

  return (
    <>
      {/* ── Top bar ── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          bgcolor: 'background.default'
        }}
      >
        <Container maxWidth='lg'>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                <LocationIcon />
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>{address}</Typography>
              </Box>
              <Divider orientation='vertical' flexItem sx={{ borderColor: 'grey.300', my: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                <EmailIcon />
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>{email}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                <PhoneIcon />
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>{phone}</Typography>
              </Box>
              <Divider orientation='vertical' flexItem sx={{ borderColor: 'grey.300', my: 1 }} />
              {[
                { icon: <WhatsAppIcon />, href: '#' },
                { icon: <XIcon />, href: '#' },
                { icon: <InstagramIcon />, href: '#' },
                { icon: <SkypeIcon />, href: '#' },
                { icon: <TelegramIcon />, href: '#' }
              ].map((s, i) => (
                <Box
                  key={i}
                  component='a'
                  href={s.href}
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'primary.dark' }
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Sticky AppBar ── */}
      <AppBar
        ref={appBarRef}
        position='sticky'
        elevation={0}
        sx={{
          top: 0,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          boxShadow: scrolled ? `0 2px 16px ${alpha(theme.palette.text.primary, 0.07)}` : 'none',
          transition: 'box-shadow 0.3s ease',
          overflow: 'visible'
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar disableGutters sx={{ height: { xs: 64, md: 72 }, gap: 2 }}>
            {/* Logo */}
            <Box
              component={Link}
              href='/'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                flexShrink: 0,
                mr: { xs: 'auto', md: 5 }
              }}
            >
              <Box sx={{ position: 'relative', width: 36, height: 36 }}>
                <Image src={logoSrc} alt={logoAlt} fill style={{ objectFit: 'contain' }} />
              </Box>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 400,
                  fontFamily: '"DM Serif Display", serif',
                  color: 'text.primary',
                  letterSpacing: '-0.01em'
                }}
              >
                Healingy
              </Typography>
            </Box>

            {/* Desktop nav */}
            <Box component='nav' sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, flex: 1 }}>
              {NAV_ITEMS.map(item => (
                <Box
                  key={item.label}
                  sx={{ position: 'static' }}
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={item.children ? handleMouseLeave : undefined}
                >
                  <Box
                    component={Link}
                    href={item.href}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1.25,
                      py: 0.75,
                      borderRadius: '8px',
                      fontSize: 14.5,
                      fontWeight: isActive(item.href) ? 600 : 400,
                      color: isActive(item.href) ? 'text.primary' : 'text.secondary',
                      textDecoration: 'none',
                      transition: 'color 0.2s, background 0.2s',
                      whiteSpace: 'nowrap',
                      borderBottom: isActive(item.href)
                        ? `2px solid ${theme.palette.text.primary}`
                        : '2px solid transparent',
                      '&:hover': { color: 'text.primary', bgcolor: alpha(theme.palette.primary.main, 0.06) }
                    }}
                  >
                    {item.label}
                    {item.children && <ChevronDownIcon />}
                  </Box>

                  {item.children && openDropdown === item.label && (
                    // Wrap dropdown in its own hover zone so mouse entering
                    // the dropdown cancels the delayed close timer
                    <Box onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave}>
                      <MegaDropdown
                        item={item}
                        onClose={() => setOpenDropdown(null)}
                        isActive={isActive}
                        navbarBottom={navbarBottom}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* Right actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                aria-label='Search'
              >
                <SearchIcon />
              </IconButton>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative' }}>
                <IconButton
                  component={Link}
                  href='/shop-cart'
                  size='small'
                  sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <CartIcon />
                </IconButton>
                {cartCount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      fontSize: 9,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    {cartCount}
                  </Box>
                )}
              </Box>

              <Button
                component={Link}
                href={ctaHref}
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  borderRadius: '50px',
                  px: 2.5,
                  py: 1,
                  fontSize: 13.5,
                  fontWeight: 500,
                  textTransform: 'none',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
                }}
              >
                {ctaLabel}
              </Button>

              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
                aria-label='Open navigation menu'
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile drawer ── */}
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 300, bgcolor: 'background.paper', px: 0 } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
            borderBottom: `1px solid ${theme.palette.grey[200]}`
          }}
        >
          <Typography
            sx={{ fontSize: 20, fontWeight: 400, fontFamily: '"DM Serif Display", serif', color: 'text.primary' }}
          >
            Healingy
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} size='small' sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 1, pt: 1 }}>
          {NAV_ITEMS.map(item => (
            <Box key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => !item.children && setMobileOpen(false)}
                  sx={{
                    borderRadius: '10px',
                    px: 2,
                    py: 1,
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) }
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: isActive(item.href) ? 600 : 400,
                      color: isActive(item.href) ? 'text.primary' : 'text.secondary'
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {item.children?.map(child => (
                <ListItem key={child.label} disablePadding sx={{ pl: 2 }}>
                  <ListItemButton
                    component={Link}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      borderRadius: '10px',
                      px: 2,
                      py: 0.75,
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) }
                    }}
                  >
                    <ListItemText
                      primary={child.label}
                      primaryTypographyProps={{ fontSize: 13.5, color: 'text.secondary' }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          ))}
        </List>

        <Box sx={{ px: 2.5, pt: 2, mt: 'auto', pb: 3 }}>
          <Button
            component={Link}
            href={ctaHref}
            fullWidth
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: '50px',
              py: 1.375,
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'none',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 'none',
              '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
            }}
          >
            {ctaLabel}
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
