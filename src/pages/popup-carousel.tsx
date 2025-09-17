import { Box, Typography } from '@mui/material'
import Slider from 'react-slick'

// Generate 20 slides dynamically
const slides = Array.from({ length: 20 }, (_, i) => ({
  title: `Slide ${i + 1}`,
  image: `https://picsum.photos/300/200?random=${i + 1}`
}))

export default function PopupCarousel() {
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true
  }

  return (
    <Box
      sx={{
        width: '100%',
        py: 5,
        userSelect: 'none', // Disable text selection
        cursor: 'grab'
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              px: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant='h6' sx={{ mb: 1 }}>
              {slide.title}
            </Typography>
            <Box
              component='img'
              src={slide.image}
              alt={slide.title}
              draggable={false} // Disable default image drag
              sx={{
                width: '100%',
                height: 160,
                userSelect: 'none' // Disable text selection
                // objectFit: 'cover',
                // borderRadius: 2,
                // boxShadow: 3
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}
