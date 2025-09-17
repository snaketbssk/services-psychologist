import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'

// Slide from bottom to center
const BottomToCenterTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} timeout={{ appear: 500, enter: 500, exit: 300 }} />
})

export default function BottomPopup() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <Button variant='contained' onClick={handleClickOpen}>
        Open Popup
      </Button>

      <Dialog
        open={open}
        TransitionComponent={BottomToCenterTransition}
        keepMounted
        onClose={handleClose}
        aria-describedby='popup-slide-description'
        PaperProps={{
          sx: {
            width: {
              xs: '90%',
              sm: '80%',
              md: '60%'
            },
            maxWidth: '800px',
            borderRadius: 3,
            p: 2,
            textAlign: 'center',
            transition: 'transform 0.5s ease'
          }
        }}
      >
        <DialogTitle>Slide From Bottom</DialogTitle>

        <DialogContent dividers sx={{ textAlign: 'left' }}>
          <Typography variant='body1' paragraph>
            В своём стремлении улучшить пользовательский опыт мы упускаем, что представители современных социальных
            резервов будут в равной степени предоставлены сами себе. Следует отметить, что убеждённость некоторых
            оппонентов создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с
            учётом комплекса благоприятных перспектив. С другой стороны, консультация с широким активом влечет за собой
            процесс внедрения и модернизации новых принципов формирования материально-технической и кадровой базы.
            Разнообразный и богатый опыт говорит нам, что глубокий уровень погружения прекрасно подходит для реализации
            системы обучения кадров, соответствующей насущным потребностям.
          </Typography>

          <Typography variant='body1' paragraph>
            Равным образом, постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить
            значение инновационных методов управления процессами. А ещё стремящиеся вытеснить традиционное производство,
            нанотехнологии представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть
            преданы социально-демократической анафеме. Следует отметить, что реализация намеченных плановых заданий не
            оставляет шанса для позиций, занимаемых участниками в отношении поставленных задач! С учётом сложившейся
            международной обстановки, существующая теория, а также свежий взгляд на привычные вещи — безусловно
            открывает новые горизонты для поставленных обществом задач. Наше дело не так однозначно, как может
            показаться: сплочённость команды профессионалов требует от нас анализа новых предложений.
          </Typography>

          <Typography variant='body1' paragraph>
            Есть над чем задуматься: явные признаки победы институционализации, которые представляют собой яркий пример
            континентально-европейского типа политической культуры, будут представлены в исключительно положительном
            свете. Как принято считать, явные признаки победы институционализации в равной степени предоставлены сами
            себе.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
