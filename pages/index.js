import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react"
import {useRouter} from "next/router"

export default function Home(props) {
  const { t } = useTranslation('common')
  const [backgroundHover, setBackgroundHover] = useState(false)
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>{t('name')}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t('name')}
        </h1>

        <p className={styles.description}>
          {t('descriptionP1')}
        </p>

        <p className={styles.description}>
          {t('descriptionP2')}
        </p>

        <p className={styles.time}>
            {t('timeDescription')}
        </p>

        <div className={styles.play_button}>
            <div className={backgroundHover ? styles.play_button_background_hover : styles.play_button_background} />
            <div className={styles.play_button_description}
                 onMouseOver={() => setBackgroundHover(true)}
                 onMouseLeave={() => setBackgroundHover(false)}
                 onClick={() => router.push('/coop/1')}
            >
                ... {t('playDescription')} →
            </div>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          ICPDAO
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
