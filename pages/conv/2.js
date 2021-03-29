import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useCallback, useState} from "react"
import {useRouter} from "next/router";
import Image from 'next/image'

export default function ConvergenceTwo() {
    const { t } = useTranslation('conv')
    const router = useRouter()
    const [backgroundHover, setBackgroundHover] = useState({})
    const [step, setStep] = useState(1)

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('page2.p1')}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.desc}>
                    <div className={styles.cove_page2_desc}>{t('page2.p1')}</div>
                    <div className={styles.cove_page2_desc}>{t('page2.p2')}</div>
                </div>
                <div className={styles.conv_page2_content}>
                    <div>
                        <Image
                            src={`/assets/ui/conv_${step}.png`}
                            width={592}
                            height={607}
                        />
                    </div>
                    <div className={styles.conv_page2_steps}>
                        {
                            [1, 2, 3].map((i) => (
                                <div key={i}>
                                    <div className={step === i ? backgroundHover[i] ? styles.play_button_background_hover : styles.play_button_background : styles.play_button_background_wait} />
                                    <div className={step === i ? styles.play_button_description : styles.play_button_description_wait}
                                         onMouseOver={() => setBackgroundHover({i: true})}
                                         onMouseLeave={() => setBackgroundHover({})}
                                         onClick={() => {i === 3 ? router.push('/conv/3') : setStep(i+1)}}
                                    >
                                        {t(`page2.s${i}`)}
                                    </div>
                                </div>
                            ))
                        }

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
