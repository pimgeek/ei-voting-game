import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

import Head from 'next/head'
import styles from '../styles/Page.module.css'
import {useRouter} from "next/router";
import Image from 'next/image'

export default function ConvergenceThree() {
    const { t } = useTranslation('ending')
    const router = useRouter()

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('title')}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.ending_ph}>{t('p1')}</div>
                <div className={styles.ending_ph}>{t('p2')}</div>
                <div className={styles.ending_ph}>{t('p3')}</div>
                <div className={styles.ending_pf}>{t('p4')}</div>
                <div className={styles.ending_pl}>
                    <Link href={t('link')}>
                        <a>{t('p5')}</a>
                    </Link>
                </div>
            </main>

        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['ending']),
    },
})
