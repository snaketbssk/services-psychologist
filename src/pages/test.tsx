import { useService } from '@/core/hooks/useService'
import TYPES from '@/core/types/type'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IProps {}

const TestPage = () => {
  const logger = useService(TYPES.LoggerService)
  const authService = useService(TYPES.AuthService)
  // const coffeeService = useService(CoffeeService)

  const handleLogin = () => {
    logger.log('test')
    const result = authService.login('john', '1234')
    //alert('Logged in, token: ' + result.token)
  }

  return (
    <>
      <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        <h1>Enterprise React App ☕</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en'))
      }
    }
  } catch (error: any) {
    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en'))
      }
    }
  }
}

//HomePage.getLayout = (page: ReactNode) => <LayoutMainWallpaper>{page}</LayoutMainWallpaper>

export default TestPage
