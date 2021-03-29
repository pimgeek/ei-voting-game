import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useCallback, useState} from "react"
import {useRouter} from "next/router";

export default function CooperationOne() {
    const { t } = useTranslation('coop')
    const [size, setSize] = useState(1)
    const router = useRouter()
    const checkSize = useCallback((s) => {
        if (0 < parseInt(s) < 21) {
            setSize(parseInt(s))
        } else {
            setSize(1)
        }
        console.log(size)
    })

    const Peep = useCallback(() => {
        return [
            {i: 1, sourceSize: {"x": 10,"y": 10}, iconSize: {x: 0, y: 0}, color: '#5088D7'},
            {i: 2, sourceSize: {"x": 427,"y": 10}, iconSize: {x: -25, y: 0}, color: '#52547C', coins: 12},
            {i: 3, sourceSize: {"x": 160,"y": 10}, iconSize: {x: -100, y: 0}, color: '#F6C06F', coins: 8},
        ].map((p) => <div key={p.i} className={styles.peep_info}>
            <div className={styles.peep}
                 style={{backgroundPositionX: p.sourceSize.x, backgroundPositionY: p.sourceSize.y}} />
            <div className={styles.dialogue}>
                <div style={{paddingTop: 50, height: 50}}>
                    <div className={styles.icon}
                         style={{backgroundPositionX: p.iconSize.x, backgroundPositionY: p.iconSize.y}}
                    />
                </div>
                <div className={styles.peep_text} style={{color: p.color}}>
                    {t(`page1.peep${p.i}`)}
                </div>
            </div>
            <div className={styles.info} style={!!!p.coins ? {background: "transparent"} : {}}>
                {p.coins ? t(`page1.sizeDescription`, {coins: p.coins}) : ''}
            </div>
        </div>)
    })

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
                    <div className={styles.p1}>{t('page1.p1')}</div>
                    {[2, 3, 4].map((i) => <div key={i} className={styles.p2}>{t(`page1.p${i}`)}</div>)}
                </div>
                <div>
                    <Peep />
                </div>
                <div className={styles.question}>
                    <p>{t('page1.p5')}</p>
                    <p>{t('page1.p6')}</p>
                </div>
                <div className={styles.input}>
                    <div className={styles.question_text}>
                        {t('page1.sizeQuestion')}
                    </div>
                    <input type="number"
                           max={20} min={1} value={size}
                           onChange={(e) => {checkSize(e.target.value)}}
                           required/>
                    <div className={styles.question_submit} onClick={() => router.push(`/coop/2?size=${size}`) }>
                        {t('page1.submit')}
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
