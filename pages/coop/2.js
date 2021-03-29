import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useCallback, useState} from "react"
import {useRouter} from "next/router";
import Image from "next/image";

export default function CooperationTwo() {
    const { t } = useTranslation('coop')
    const router = useRouter()
    const { size } = router.query
    const Peep = useCallback(() => {
        return [
            {i: 1, iconSize: {x: 0, y: 0}, color: '#5088D7'},
            {i: 2, iconSize: {x: -25, y: 0}, color: '#52547C'},
            {i: 3, iconSize: {x: -100, y: 0}, color: '#F6C06F'},
        ].map((p) => <div key={p.i} className={styles.page2_peep_info}>

            <div className={styles.dialogue}>
                <div style={{paddingTop: 50, height: 50}}>
                    <div className={styles.icon}
                         style={{backgroundPositionX: p.iconSize.x, backgroundPositionY: p.iconSize.y}}
                    />
                </div>
                <div className={styles.peep_text} style={{color: p.color}}>
                    {t(`page2.peep${p.i}`)}
                </div>
            </div>

        </div>)
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('page2.title')}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.page2_title}>
                    {t('page2.title')}
                </div>
                <div className={styles.page2_p1}>
                    {t('page2.title2')}
                </div>
                <div className={styles.page2_size1}>size: {size}</div>
                <div className={styles.page2_size2}>size: 12</div>
                <div className={styles.page2_size3}>size: 8</div>
                <div className={styles.vote}>
                    <div className={styles.page2_image}>
                        <Image
                            src={`/assets/ui/coop_vote.png`}
                            width={531}
                            height={404}
                        />
                    </div>
                    <div className={styles.page2_peep}>
                        <Peep />
                    </div>
                </div>
                <div className={styles.page2_question}>
                    <p>{t('page2.p1')}</p>
                    <p>{t('page2.p2')}</p>
                    <p style={{paddingTop: 30}}>{t('page2.p3')}</p>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button} onClick={() => {router.push(`/coop/3?vote=1&size=${size}`)}}>
                        {t(`page2.peep2`)}
                    </div>
                    <div className={styles.button} onClick={() => {router.push(`/coop/3?vote=2&size=${size}`)}}>
                        {t(`page2.peep3`)}
                    </div>
                </div>

            </main>

        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['coop']),
    },
})
