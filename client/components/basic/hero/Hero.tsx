import React from 'react';
import styles from '../../../styles/hero/hero.module.scss';
import Image from 'next/image';
import Button, {ButtonTypes, HtmlTypes} from "../../shared/Button/Button";

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.img}>
                        <Image src="/hero-img.png"
                            alt="Hero"
                            width={875}
                            height={375}
                        />
                    </div>
                    <div className={styles.main}>
                        <h1 className={styles.title}>
                            Explore new trends
                        </h1>
                        <p className={styles.description}>
                            The history of various visual media has typically begun with black and white,
                            and as technology improved, altered to color. However, there are exceptions
                            to this rule, including black-and-white fine art photography, as well as many
                            motion pictures and art films. The history of various visual media has typically begun with
                            black and white, and as technology improved, altered to color.
                        </p>
                        <div className={styles.heroBtnWrapper}>
                            <Button htmlType={HtmlTypes.Button} className={styles.heroBtn} type={ButtonTypes.Primary}>Get Started</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
