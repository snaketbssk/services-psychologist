import { MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface IProps {
  handleLogout: () => void
}

const HeaderMenuUserLogoutItem = ({ handleLogout }: IProps) => {
  const { t } = useTranslation()
  return <MenuItem onClick={handleLogout}>{t('MENU.EXIT')}</MenuItem>
}

export default HeaderMenuUserLogoutItem
