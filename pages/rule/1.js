import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useCallback, useEffect} from "react"
import {useRouter} from "next/router";

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function RuleUnderstandOne() {
    const { t } = useTranslation('rule')
    const router = useRouter()
    const pair = {}
    const peep = [
        {i: 1, sourceSize: {"x": 10,"y": 10}, color: '#5088D7'},
        {i: 2, sourceSize: {"x": 427,"y": 10}, color: '#52547C'},
        {i: 3, sourceSize: {"x": 160,"y": 10}, color: '#F6C06F'},
    ]
    peep.forEach((p, i) => {
        const issueNum = getRandomIntInclusive(3, 4)
        let issuesSize = []
        for (let i = 0; i < issueNum; i++) {
            const size = getRandomIntInclusive(3, 6)
            issuesSize.push(size)
        }
        pair[p.i] = issuesSize
        peep[i].size = issuesSize
    })
    useEffect(() => {
        window.localStorage.setItem('pair', JSON.stringify(pair))
    })

    const Peep = useCallback(() => {
        return peep.map((p) => {
            let issues = []
            for (let i = 0; i < p.size.length; i++) {
                const size = p.size[i]
                issues.push((
                    <div key={'is' + i.toString()} className={styles.rule_page1_size} style={{backgroundColor: p.color}}>
                        size: {size}
                    </div>
                ))
            }

            return <div key={'pp' + p.i.toString()} className={styles.peep_info}>
                <div className={styles.peep}
                     style={{backgroundPositionX: p.sourceSize.x, backgroundPositionY: p.sourceSize.y}} />
                <div className={styles.rule_page1_sizes}>
                    {issues}
                </div>
            </div>
        })
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
                <div className={styles.rule_page1_desc}>
                    <div>{t('page1.p1')}</div>
                    <div>{t('page1.p2')}</div>
                    <div>{t('page1.p3')}</div>
                    <div style={{paddingTop: 20}}>{t('page1.p4')}</div>
                </div>
                <div>
                    <Peep />
                </div>
                <div className={styles.rule_page1_play} onClick={() => router.push(`/rule/2`) }>
                    {t('page1.play')}
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
