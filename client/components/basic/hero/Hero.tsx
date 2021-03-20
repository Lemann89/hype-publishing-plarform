import React from 'react';
import styles from '../../../styles/basics/hero/hero.module.scss';
import Image from 'next/image';
import Button, {ButtonTypes, HtmlTypes} from "../../shared/Button/Button";
import Container from "../container/Container";
import Link from 'next/link';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <Container>
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
                            <Link href="/signup">
                                <Button htmlType={HtmlTypes.A} className={styles.heroBtn} type={ButtonTypes.Primary}>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Hero;
