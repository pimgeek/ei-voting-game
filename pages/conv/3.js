import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'
import styles from '../../styles/Page.module.css'
import {useRouter} from "next/router";
import Image from 'next/image'
import {useState} from "react";

export default function ConvergenceThree() {
    const { t } = useTranslation('conv')
    const router = useRouter()
    const [backgroundHover, setBackgroundHover] = useState(false)

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('page2.p1')}</title>
            </Head>
            <main className={styles.main}>

                <div className={styles.conv_page2_content}>
                    <div>
                        <Image
                            src={`/assets/ui/conv_4.png`}
                            width={592}
                            height={607}
                        />
                    </div>
                    <div className={styles.conv_page3_steps}>
                        <div className={styles.desc}>
                            <div className={styles.cove_page3_desc}>{t('page3.p1')}</div>
                            <div className={styles.cove_page3_desc} style={{marginTop: 30}}>{t('page3.p2')}</div>
                            <div className={styles.cove_page3_desc} style={{marginTop: 50}}>{t('page3.p3')}</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className={backgroundHover ? styles.play_button_background_hover : styles.play_button_background} />
                    <div className={styles.play_button_description}
                         onMouseOver={() => setBackgroundHover(true)}
                         onMouseLeave={() => setBackgroundHover(false)}
                         onClick={() => router.push('/ending')}
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
        ...await serverSideTranslations(locale, ['conv']),
    },
})
