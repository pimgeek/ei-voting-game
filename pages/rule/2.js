import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useCallback, useState} from "react"
import {useRouter} from "next/router";
import {getRandomIntInclusive} from "./1"

function km_simple(sizes) {
    let paired = {1: [], 2: [], 3: []}
    const p1 = [...sizes[1], ...sizes[1]]
    const p2 = [...sizes[2], ...sizes[2]]
    const p3 = [...sizes[3], ...sizes[3]]
    p1.forEach((p) => {
        const r = getRandomIntInclusive(0, p2.length + p3.length - 1)
        let q = [...p2, ...p3][r]
        if (r >= p2.length) {
            paired[2].push([{i: 1, p}, {i: 3, p: q}])
            p3.splice(r, 1)
        } else {
            paired[3].push([{i: 1, p}, {i: 2, p: q}])
            p2.splice(r, 1)
        }
    })
    p2.forEach((p) => {
        const r = getRandomIntInclusive(0, p3.length -1)
        let q = p3[r]
        p3.splice(r, 1)
        paired[1].push([{i: 2, p}, {i: 3, p: q}])
    })
    for (let i = 0; i < p3.length; i+=2) {
        if (p3[i] && p3[i+1]) {
            if (paired[1].length > paired[2].length) paired[2].push([{i: 3, p: p3[i]}, {i: 3, p: p3[i + 1]}])
            else paired[1].push([{i: 3, p: p3[i]}, {i: 3, p: p3[i + 1]}])
        }
    }

    return paired
}

export default function RuleUnderstandTwo() {
    const { t } = useTranslation('rule')
    const router = useRouter()
    const color = {1: '#5088D7', 2: '#52547C', 3: '#F6C06F'}
    let paired = {1: [], 2: [], 3: []}
    if (typeof window !== "undefined") {
        const pair = JSON.parse(window.localStorage.getItem('pair') || '{}')
        paired = km_simple(pair)
    }
    const Peep = useCallback(() => [
        {i: 1, sourceSize: {"x": 10,"y": 10}},
        {i: 2, sourceSize: {"x": 427,"y": 10}},
        {i: 3, sourceSize: {"x": 160,"y": 10}},
    ].map((p) => <div key={p.i} className={styles.rule_page2_peep}>
        <div className={styles.rule_page2_peep_single}
             style={{backgroundPositionX: p.sourceSize.x, backgroundPositionY: p.sourceSize.y}} />
        <div className={styles.rule_page2_pair_group}>
            {
                paired[p.i].map((p, n) => <div key={n} className={styles.rule_page2_pair}>
                    <div className={styles.rule_page2_pair_left} style={{backgroundColor: color[p[0].i]}}>
                        size: {p[0].p}
                    </div>
                    <div className={styles.rule_page2_pair_right} style={{backgroundColor: color[p[1].i]}}>
                        size: {p[1].p}
                    </div>
                </div>)
            }
        </div>
    </div>))

    return (
        <div className={styles.container} onClick={() => router.push('/conv/1')}>
            <Head>
                <title>{t('page2.title')}</title>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {t('page2.title')}
                </h1>
                <div className={styles.rule_page2_desc}>
                    {t('page2.desc')}
                </div>
                <div className={styles.rule_page2_content}>
                    <Peep />
                </div>
            </main>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['rule']),
    },
})
