import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useCallback, useState} from "react"
import {useRouter} from "next/router";
import Image from 'next/image'

export default function ConvergenceOne() {
    const { t } = useTranslation('conv')
    const router = useRouter()
    const [backgroundHover, setBackgroundHover] = useState(false)

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('page1.title')}</title>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {t('page1.title')}
                </h1>
                <div className={styles.desc}>
                    <div className={styles.cove_page1_desc}>{t('page1.desc')}</div>
                </div>
                <Image
                    src="/assets/evolution/evolution_intro.png"
                    width={1306}
                    height={239}
                />
                <div className={styles.cove_page1_steps}>
                    <div className={styles.cove_page1_step}>
                        <p>{t('page1.s1')}</p>
                        <p>{t('page1.s1d')}</p>
                    </div>
                    <div className={styles.cove_page1_step}>
                        <p>{t('page1.s2')}</p>
                        <p>{t('page1.s2d')}</p>
                    </div>
                    <div className={styles.cove_page1_step}>
                        <p>{t('page1.s3')}</p>
                        <p>{t('page1.s3d')}</p>
                    </div>
                </div>
                <div className={styles.play_button}>
                    <div className={backgroundHover ? styles.play_button_background_hover : styles.play_button_background} />
                    <div className={styles.play_button_description}
                         onMouseOver={() => setBackgroundHover(true)}
                         onMouseLeave={() => setBackgroundHover(false)}
                         onClick={() => router.push('/conv/2')}
                    >
                        ... {t('page1.play')} →
                    </div>
                </div>
            </main>

        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['conv']),
    },
})
