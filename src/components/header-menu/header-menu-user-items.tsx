import { MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface IProps {
  // eslint-disable-next-line unused-imports/no-unused-vars
  handleSelect: (value: string) => void
}

const HeaderMenuUserItems = ({ handleSelect }: IProps) => {
  const { t } = useTranslation()
  return (
    <>
      <MenuItem onClick={() => handleSelect('/settings/account')}>{t('SETTINGS.ACCOUNT.TAB')}</MenuItem>
      <MenuItem onClick={() => handleSelect('/settings/change-password')}>{t('SETTINGS.CHANGE_PASSWORD.TAB')}</MenuItem>
      <MenuItem onClick={() => handleSelect('/settings/two-factor-authentication')}>{t('SETTINGS.TFA.TAB')}</MenuItem>
      <MenuItem onClick={() => handleSelect('/settings/sessions')}>{t('SETTINGS.SESSIONS.TAB')}</MenuItem>
    </>
  )
}

export default HeaderMenuUserItems
