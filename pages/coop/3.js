import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useRouter} from "next/router";
import {useState} from "react";

export default function CooperationThree() {
    const { t } = useTranslation('coop')
    const router = useRouter()
    const [backgroundHover, setBackgroundHover] = useState(false)
    const { vote, size } = router.query

    let peep = [
        {i: 1, iconSize: {x: 0, y: 0}, color: '#5088D7'},
        {i: 2, iconSize: {x: -25, y: 0}, color: '#52547C'},
        {i: 3, iconSize: {x: -100, y: 0}, color: '#F6C06F'},
    ].map((p, n) => <div key={n.toString()}>
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
    peep = [(
        <div key={'-1'}>
            <div className={styles.dialogue + ' ' + styles.transparent}>
                <div style={{paddingTop: 50, height: 50}}>
                    <div className={styles.icon + ' ' + styles.transparent}/>
                </div>
            </div>
        </div>
    ), ...peep]
    let issue = [t('page3.t1'), 1, 1, 1].map((i, t) => <div key={t} className={styles.page3_table_row}>{i}</div>)
    let sizes = [t('page3.t2'), size, 12, 8].map((i, t) => <div key={t} className={styles.page3_table_row}>{i}</div>)
    let ei = []
    let coins = [t('page3.t4')]

    const pair = [
        [1, 0], [1, 2], [0, 2]
    ]
    const allSize = {0: parseInt(size), 1: 12, 2: 8}
    const es = {0: 0, 1: 0, 2: 0}

    for (let i = 0; i < pair.length; i++) {
        const p = pair[i]
        if (p[0] === 1 && p[1] === 2) {
            es[parseInt(vote)] += allSize[parseInt(vote)]
            continue
        }
        let v = Math.round(Math.random())
        if (allSize[p[0]] < allSize[p[1]]) {
            v = 0
        } else if (allSize[p[0]] > allSize[p[1]]) {
            v = 1
        }
        es[p[v]] += allSize[p[v]]
    }
    for (let e in [0, 1, 2]) {
        let t = es[e] / allSize[e]
        ei.push(t)
        if (t < 0.8) {
            coins.push(allSize[e]/2)
        } else {
            coins.push(allSize[e])
        }
    }

    ei = ei.map((e, t) => {
        let color = "#098C2B"
        if (e < 0.8) {color = "#FD1616"}
        else if (e <= 1) {color = "#F6C06F"}
        return <div key={t.toString()} className={styles.page3_table_row} style={{color: color}}>{parseFloat(e)}</div>
    })
    ei = [(
        <div key={'-1'} className={styles.page3_table_row}>{t('page3.t3')}</div>
    ), ...ei]

    coins = coins.map((c, t) => <div key={t.toString()} className={styles.page3_table_row}>{c.toString()}</div>)

    const VoteResultTable = <div className={styles.page3_vote_result}>
        <div className={styles.page3_table}>
            {peep}
        </div>
        <div className={styles.page3_table}>
            {issue}
        </div>
        <div className={styles.page3_table}>
            {sizes}
        </div>
        <div className={styles.page3_table}>
            {ei}
        </div>
        <div className={styles.page3_table}>
            {coins}
        </div>
    </div>

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('page3.title')}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.desc}>
                    <div className={styles.page3_title}>{t('page3.title')}</div>
                </div>
                {VoteResultTable}
                <div className={styles.page3_tips1}>
                    {t('page3.tips1')}
                </div>
                <div className={styles.page3_tips2}>
                    {t('page3.tips2')}
                </div>
                <div className={styles.page3_prompt1}>
                    {t('page3.prompt1')}
                </div>
                <div className={styles.page3_prompt2}>
                    {t('page3.prompt2')}
                </div>
                <div>
                    <div className={backgroundHover ? styles.play_button_background_hover : styles.play_button_background} />
                    <div className={styles.play_button_description}
                         onMouseOver={() => setBackgroundHover(true)}
                         onMouseLeave={() => setBackgroundHover(false)}
                         onClick={() => router.push('/rule/1')}
                    >
                        {t('page3.continue')} →
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
